import { User, Product } from "../models.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    // console.log(req.user)

    const product = await Product.findById(productId);
    // console.log(product)

    if (!product) return res.status(400).send("Product not found");

    const user = await User.findOne({ email: req.user.email });
    // console.log(user.cart.find(s=>s))

    if (!user) return res.status(400).send("User not found");

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId.toString()
    );
    // console.log(productId)

    if (existingCartItem) {
      // If product already exists in the cart, update the quantity
      existingCartItem.quantity++;
    } else {
      // If product is not in the cart, add it
      user.cart.push({ product, quantity: 1 });
    }
    // console.log(user)
    await user.save();
  } catch (err) {
    console.log({ err });
    res.send(err);
  }

  res.status(200).send("Product added to cart successfully");
};

export const decQty = async (req, res) => {
  // console.log('here')
  try {
    const { productId } = req.body;
    // console.log(req.user)

    const product = await Product.findById(productId);
    // console.log(product)

    if (!product) return res.status(400).send("Product not found");

    const user = await User.findOne({ email: req.user.email });
    // console.log(user.cart.find(s=>s))

    if (!user) return res.status(400).send("User not found");
    let indx = -1;
    const existingCartItem = user.cart.find((item) => {
      indx++;
      return item.product.toString() === productId.toString();
    });
    // console.log({ indx });

    if (existingCartItem) {
      // If product already exists in the cart, update the quantity
      // console.log(existingCartItem.quantity);
      if (existingCartItem.quantity > 0) existingCartItem.quantity--;
      // console.log(existingCartItem.quantity);

      if (existingCartItem.quantity == 0) {
        // console.log(0);
        user.cart.splice(indx, 1);
      }
    }
    // console.log(user)
    await user.save();
  } catch (err) {
    console.log({ err });
    res.send(err);
  }

  res.status(200).send("Product added to cart successfully");
};

export const incQty = async (req, res) => {
  try {
    const { productId } = req.body;
    // console.log(req.user)

    const product = await Product.findById(productId);
    // console.log(product)

    if (!product) return res.status(400).send("Product not found");

    const user = await User.findOne({ email: req.user.email });
    // console.log(user.cart.find(s=>s))

    if (!user) return res.status(400).send("User not found");

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId.toString()
    );
    // console.log(productId)

    if (existingCartItem) {
      // If product already exists in the cart, update the quantity
      existingCartItem.quantity++;
    } else {
      // If product is not in the cart, add it
      user.cart.push({ product, quantity: 1 });
    }
    // console.log(user)
    await user.save();
  } catch (err) {
    console.log({ err });
    res.send(err);
  }

  res.status(200).send("Product added to cart successfully");
};

export const deleteCart = async (req, res) => {
  try {
    const { productId } = req.body;
    // console.log(req.user)

    const product = await Product.findById(productId);
    // console.log(product)

    if (!product) return res.status(400).send("Product not found");

    const user = await User.findOne({ email: req.user.email });
    // console.log(user.cart.find(s=>s))

    if (!user) return res.status(400).send("User not found");
    let indx = -1;
    const existingCartItem = user.cart.find((item) => {
      indx++;
      return item.product.toString() === productId.toString();
    });
    // console.log(productId)

    if (existingCartItem) {
      // If product already exists in the cart, update the quantity
      user.cart.splice(indx, 1);
    } 
    // console.log(user)
    await user.save();
  } catch (err) {
    console.log({ err });
    res.send(err);
  }

  res.status(200).send("Product added to cart successfully");
};

export const getCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate({
    path: "cart.product",
    model: "Product",
  });
  console.log(user);

  if (!user) return res.status(400).send("User not found");

  res.status(200).send(user.cart);
};
