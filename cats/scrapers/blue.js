import BRANDS from './_brands.js';
const brandData = BRANDS?.blue;
const URL = brandData?.site?.all

// const URL = "https://bluebuffalo.com/product-finder/cat/";

const LOUD = true;

const scraper = async () => {
  const html = await fetch(URL)
    .then(res => res.text())
    .then(res => {
      if (LOUD) console.log(res);
      return new DOMParser().parseFromString(res, 'text/html');
    })
  ;

  const products = [...html.querySelector('#productList')
    .querySelectorAll('li')]
    .map(li => {
      const sku = li.querySelector('[ps-sku]').getAttribute('ps-sku');

      const product = {
        sku
      };
      if (LOUD) console.log(product);
      return product;
    })
  ;

  return products;
};

scraper();

export default scraper;