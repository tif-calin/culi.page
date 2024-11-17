# imports
import json
import requests
import re

import pprint
pp = pprint.PrettyPrinter(indent = 2)

# beautifulsoup
from bs4 import BeautifulSoup

# selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options

opts = Options()    
opts.add_argument('--headless')
opts.add_argument('--disable-gpu')
driver = webdriver.Firefox(executable_path=r'./geckodriver', options=opts)

# settings
LOUD = True

# data
def get_brand_data(brand = 'blue'):
  with open('brands.json') as f:
    data = json.load(f)
  return data[brand]

DATA = get_brand_data('blue')

# parsing
def handle_blue_line(line):
  # lowercase the line
  line = line.lower().replace('blue', '').strip().replace(' ', '-')

  if line in [l['slug'] for l in DATA['lines']]: return line
  else:
    if line == 'tastefuls': return 'tastefuls'
    else: return 'life-protection-formula'

def handle_life_stage(life_stage):
  life_stage = life_stage.lower().strip()

  if 'treats' in life_stage or 'crunchies' in life_stage: raise Exception('not wet or dry food')

  if 'kitten' in life_stage: return 'kitten'
  elif 'adult' in life_stage: return 'adult'
  elif 'senior' in life_stage or 'mature' in life_stage: return 'senior'

def handle_sizes(sizes: str) -> list:
  nums = re.findall(r'(\d+(\.[0-9]+)?)', sizes)
  
  if 'lb' in sizes:
    return list(map(lambda x: float(x[0]) * 453.592, nums))
  elif 'oz' in sizes:
    return list(map(lambda x: float(x[0]) * 28.3495, nums))

def parse_product_page(product, loud = LOUD):
  source = requests.get(product['url']).text
  soup = BeautifulSoup(source, 'html.parser')

  """
  What we want:
    exclusive_to_petco: boolean
    wet_or_dry: string ['wet', 'dry']
    life_stage: string ['kitten', 'adult', 'senior']
    big_img: string [url]
    description: string
    tag_lines: list<string>
    sizes: list<float>
    container: string ['bag', 'can', 'pouch']
    highlighted_ingredients: list<string>
    promises: list<string>
    kcal_per_kg: float
    kcal_per_cup: float
    guaranteed_analysis: dict
    ingredients: list<string>
  Update:
    name: string
  """

  # first section (hero)
  try:
    product['big_img'] = DATA['domain'] + soup.select_one('.Hero picture > img').attrs['src']
    product['life_stage'] = handle_life_stage(soup.select_one('.Hero-text p.Heading--subtitle').text)
    product['description'] = soup.select_one('.Hero-info > p:first-of-type').text.strip()
    product['tag_lines'] = list(map(
      lambda x: x.text.strip(),
      soup.select('.Hero-info > div > ul.u-hasInlineBullets > li')
    ))

    sizes_text = soup.select_one('.Hero-info > p:last-of-type').text
    product['sizes'] = handle_sizes(sizes_text)

    if 'cans' in sizes_text: product['container'] = 'can'
    elif 'pouch' in sizes_text: product['container'] = 'pouch'
    else: product['container'] = 'bag'
  except Exception as e:
    print('\n', e)
    pp.pprint(product)
    return None

  if loud: pp.pprint(product)
  return product

def parse_listing(product, loud = LOUD):
  # bottom half
  sku = product.select_one('[ps-sku]').attrs['ps-sku']
  rating = float(product.select_one('.bv_text').text)
  rating_count = int(product.select_one('div.bv_numReviews_component_container > .bv_text').text[1:-1])
  # top half
  url = DATA['domain'] + product.select_one('.product-info').attrs['href']
  slug = url.split('/')[-2]
  line = handle_blue_line(product.select_one('.text_wrapper > h5').text)
  name = product.select_one('.text_wrapper > p').text.strip()
  img = DATA['domain'] + product.select_one('img').attrs['src']

  if loud: print(f'{name} - {line}: {sku}')

  return {
    'url': url,
    'slug': slug,
    'img': img,
    'line': line,
    'name': name,
    'rating': {
      'average': rating,
      'count': rating_count
    },
    'sku': sku
  }

def scraper(products = [], opts = { 'parse_listings': True, 'parse_product_pages': True }):
  driver.get(DATA['site']['all'])

  if opts['parse_listings']:
    try:
      WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.bv_main_container')))
    finally:
      soup = BeautifulSoup(driver.page_source, 'html.parser')
      products = list(map(parse_listing, soup.select('#productList > li')))
      with open(f"{DATA['slug']}.json", 'w') as f:
        json.dump(products, f, indent = 2)
      driver.close()

  if opts['parse_product_pages']:
    # for each product, load its page and get additional data
    products = [x for x in list(map(parse_product_page, products)) if x]

    with open(f"{DATA['slug']}.json", 'w') as f:
      json.dump(products, f, indent = 2)
  
  return products

scraper()