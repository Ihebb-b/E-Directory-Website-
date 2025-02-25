const Menu = require('../models/menuModel');

const createMenu = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const { name, description, plates } = req.body;


    if (!req.file) return res.status(400).json({ message: 'Image is required.' });


    // Validate request data
    if (!name || !description || !plates || plates.length === 0) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let parsedPlates;
    try {
      parsedPlates = typeof plates === 'string' ? JSON.parse(plates) : plates;
    } catch (error) {
      return res.status(400).json({ message: 'Invalid plates format.' });
    }

    if (!Array.isArray(parsedPlates) || parsedPlates.length === 0) {
      return res.status(400).json({ message: 'Plates must include at least one plate.' });
  }

  console.log("Parsed Plates:", parsedPlates);


    // Extract user ID from req.user
    const userId = req.user._id;

    // Create a new menu
    const newMenu = new Menu({
      name,
      description,
      image: `/uploads/${req.file.filename}`,
      plates: parsedPlates,
      user: userId, // Ensure user ID is passed from the frontend
    });
    console.log(req.body);

    // Save the menu to the database
    const savedMenu = await newMenu.save();

    res.status(201).json({ message: 'Menu created successfully.', menu: savedMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the menu.', error: error.message });
  }
};


const getMenuList = async (req, res) => {
  try {
    const menus = await Menu.find({ user: req.user._id });
    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the menu list.', error: error.message });
  }
};


const menuList = async (req, res) => {
  try {
    // Fetch menus for the logged-in user using their ID
    const menus = await Menu.find({ user: req.user._id });

    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: 'No menus found for this user.' });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the menu list.', error: error.message });
  }
};


const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMenusPagi = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; // Default to page 1 and 5 items per page

    // Calculate the start index
    const startIndex = (page - 1) * limit;

    // Fetch restaurants with pagination
    const menus = await Menu.find({})
      .select("name description image")
      .skip(startIndex)
      .limit(parseInt(limit));

    // Count total restaurants for pagination metadata
    const totalMenus = await Menu.countDocuments({});

    res.status(200).json({
      menus,
      totalPages: Math.ceil(totalMenus / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getMenuById = async (req, res) => {
//   const menuId = req.params.id; // Get the menu ID from the request parameters

//   // Find the menu by ID
//   const menu = await Menu.findById(menuId);

//   if (!menu) {
//     return res.status(404).json({ error: "Menu not found" });
//   }

//   // Return the found menu
//   res.status(200).json(menu);
// };

const getMenuById = async (req, res) => {
  const menuId = req.params.id;

  try {
      const menu = await Menu.findById(menuId);

      if (!menu) {
          return res.status(404).json({ error: "Menu not found" });
      }

      res.status(200).json(menu);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
};

const getMenuByUserId = async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the request parameters

  // Find menus by user ID
  const menus = await Menu.find({ user: userId }); // Assuming a `user` field exists in the `Menu` schema

  if (!menus || menus.length === 0) {
    return res.status(404).json({ error: "No menus found for this user" });
  }

  // Return the found menus
  res.status(200).json(menus);
};

const modifyMenu = async (req, res) => {

  try{
  const { id } = req.params; // Get the menu ID from the request parameters
  const { name, description, image, plates } = req.body; // Get the updated data from the request body
  const newImageFile = req.file; // New image from uploaded file (if provided)

  // Find the menu by ID and update it

  if (!name || !description || !plates || plates.length === 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let parsedPlates;
  try {
    parsedPlates = typeof plates === 'string' ? JSON.parse(plates) : plates;
  } catch (error) {
    return res.status(400).json({ message: 'Invalid plates format.' });
  }

  // if (!Array.isArray(parsedPlates) || parsedPlates.length === 0) {
  //   return res.status(400).json({ message: 'Plates must include at least one plate.' });
  // }    if (newImageFile) {
  //     // A new image is uploaded
  //     imageToUse = `/uploads/${newImageFile.filename}`;
  //   } else if (existingImage) {
  //     // Retain the existing image
  //     imageToUse = existingImage;
  //   } else {
  //     return res.status(400).json({ message: 'An image must be provided.' });
  //   }

    const existingMenu = await Menu.findById(id);
    if (!existingMenu) {
        return res.status(404).json({ message: 'Menu not found.' });
    }

    const imageToUse = newImageFile
    ? `/uploads/${newImageFile.filename}` // Use new uploaded image
    : existingMenu.image; // Retain existing image if no new image is uploaded
  
  const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, 
        description, 
        image : imageToUse, 
        plates: parsedPlates}, // Update the user field with the logged-in user's ID
      { new: true, runValidators: true } // Return the updated document and run validators
  );

  if (!updatedMenu) {
      return res.status(404).json({ error: "Menu not found" });
  }

  // Return the updated menu
  res.status(200).json({ message: 'Menu updated successfully.', menu: updatedMenu });
} catch (error)  {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the menu.', error: error.message });
  
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params; // Get the menu ID from the request parameters

  // Find the menu by ID and delete it
  const deletedMenu = await Menu.findByIdAndDelete(id);

  if (!deletedMenu) {
      return res.status(404).json({ error: "Menu not found" });
  }

  // Return a success message
  res.status(200).json({ message: "Menu deleted successfully" });
} 


module.exports =
{
  createMenu,
  getMenuList,
  menuList,
  getAllMenus,
  getAllMenusPagi,
  getMenuById,
  getMenuByUserId,
  modifyMenu,
  deleteMenu,
};
