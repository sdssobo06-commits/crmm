import { readProducts, writeProducts } from '../db/dbHelper.js';

export const getProducts = (req, res) => {
  const products = readProducts();
  res.json(products);
};

export const getProductById = (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Mahsulot topilmadi' });
  }
  res.json(product);
};

export const createProduct = (req, res) => {
  const products = readProducts();
  const { title, price, category, image, description, rating } = req.body;

  if (!title || !price || !category || !image || !description) {
    return res.status(400).json({ message: 'Barcha maydonlar to\'ldirilishi shart' });
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    title,
    price: parseFloat(price),
    category,
    image,
    description,
    rating: rating || { rate: 4.5, count: 10 }
  };

  products.unshift(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Mahsulot topilmadi' });
  }

  const { title, price, category, image, description, rating } = req.body;
  const updatedProduct = {
    ...products[index],
    title: title !== undefined ? title : products[index].title,
    price: price !== undefined ? parseFloat(price) : products[index].price,
    category: category !== undefined ? category : products[index].category,
    image: image !== undefined ? image : products[index].image,
    description: description !== undefined ? description : products[index].description,
    rating: rating !== undefined ? rating : products[index].rating
  };

  products[index] = updatedProduct;
  writeProducts(products);
  res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Mahsulot topilmadi' });
  }

  products.splice(index, 1);
  writeProducts(products);
  res.json({ message: 'Mahsulot muvaffaqiyatli o\'chirildi' });
};
