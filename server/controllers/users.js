const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const WishList = require('../models/wishlist')

usersRouter.post("/signup", async (request, response) => {
  const body = request.body;

  let user;
  try {
    user = await User.findOne({ username: body.username });
  } catch (exception) {
    return response
      .status(500)
      .json({ error: "A database error has occurred" });
  }
  if (user) {
    return response
      .status(400)
      .json({ error: "The username has already been taken" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    return response.json(savedUser);
  } catch (exception) {
    return response
      .status(500)
      .json({ error: "A database error has occurred" });
  }
});

usersRouter.post("/login", async (request, response) => {
  const body = request.body;

  let user;
  try {
    user = await User.findOne({ username: body.username });
  } catch (exception) {
    return response
      .status(500)
      .json({ error: "A database error has occurred" });
  }

  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    return response.status(401).json({ error: "Invalid username or password" });
  }

  const payload = {
    id: user._id,
    username: user.username,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

  return response.status(200).send({ token: `Bearer ${token}` });
});

usersRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findById(request.params.id);
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

usersRouter.put(
  "/:id/save-look",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $addToSet: { savedLooks: request.body.photoUrl } },
        { new: true }
      );
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

usersRouter.put(
  "/:id/delete-look",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        { $pull: { savedLooks: request.body.photoUrl } },
        { new: true }
      );
      return response.json(user);
    } catch (exception) {
      return response
        .status(500)
        .json({ error: "A database error has occurred" });
    }
  }
);

usersRouter.post('/create-wishlist', async (req, res) => {
  const wishListId = uuidv4();
  const newWishList = new WishList({ wishListId, items: [] });

  try {
      const result = await newWishList.save();
      res.status(201).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create wishlist' });
  }
});

usersRouter.post('/wishlist/:wishListId/item', async (req, res) => {
const { wishListId } = req.params;
const { caption, productLink,image} = req.body;
const item = { caption, productLink,image };

try {
    const wishList = await WishList.findOne({ wishListId });
    if (!wishList) {
        return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishList.items.push(item);
    await wishList.save();
    res.status(201).json(wishList);
} catch (error) {
    res.status(500).json({ error: 'Failed to add item to wishlist' });
}
});

usersRouter.get('/wishlist/:wishListId/items', async (req, res) => {
const { wishListId } = req.params;

try {
    const wishList = await WishList.findOne({ wishListId });
    if (!wishList) {
        return res.status(404).json({ error: 'Wishlist not found' });
    }

    res.status(200).json(wishList.items);
} catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items from wishlist' });
}
});

usersRouter.post('/join-wishlist', async (req, res) => {
  const { wishlistId } = req.body;
  try {
    const wishlist = await WishList.findOne({ wishlistId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = usersRouter;
