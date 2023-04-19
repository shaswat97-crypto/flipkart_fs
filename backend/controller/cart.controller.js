import { User, Product } from "../models.js";

export const addToCart = async (req, res) => {
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
  // if(undefined) console.log('bruh')
  // console.log(productId)

  if (existingCartItem) {
    // If product already exists in the cart, update the quantity
    existingCartItem.quantity++;
  } else {
    // If product is not in the cart, add it
    user.cart.push({ product, quantity: 1 });
  }

  // console.log(user)

  try {
    await user.save();
  } catch (err) {
    console.log({ err });
  }

  res.status(200).send("Product added to cart successfully");
};

export const getCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate({
    path: "cart.product",
    model: "Product",
  });

  if (!user) return res.status(400).send("User not found");

  res.status(200).send(user.cart);
};
