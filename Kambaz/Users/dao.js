// Kambaz/Users/dao.js
import model from "./model.js";

// Add debugging to troubleshoot authentication issues
export const findUserByCredentials = async (username, password) => {
  try {
    console.log(`Authenticating user: ${username}`);
    
    // First try an exact match with username and password
    const user = await model.findOne({ 
      username: username,
      password: password 
    });
    
    if (user) {
      console.log(`Authentication successful for user: ${user._id}`);
      console.log(`Role: ${user.role}, Name: ${user.firstName} ${user.lastName}`);
      return user;
    }
    
    // If no match, check if the username exists at all
    const userByUsername = await model.findOne({ username: username });
    if (userByUsername) {
      console.log(`User ${username} exists but password doesn't match`);
    } else {
      console.log(`User ${username} not found in database`);
    }
    
    return null;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

export const findUserByUsername = async (username) => {
  try {
    const user = await model.findOne({ username: username });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    console.log("Creating user:", user.username);
    const newUser = await model.create(user);
    console.log("User created with ID:", newUser._id);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userUpdates) => {
  try {
    console.log(`Updating user ${userId} with:`, userUpdates);
    const status = await model.updateOne(
      { _id: userId },
      { $set: userUpdates }
    );
    return status;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  const status = await model.deleteOne({ _id: userId });
  return status;
};

export const findAllUsers = async () => {
  const users = await model.find();
  return users;
};

export const findUserById = async (userId) => {
  try {
    const user = await model.findById(userId);
    return user;
  } catch (error) {
    console.error(`Error finding user by ID ${userId}:`, error);
    return null;
  }
};

export const findUsersByRole = async (role) => {
  const users = await model.find({ role });
  return users;
};

export const findUsersByPartialName = async (name) => {
  const users = await model.find({
    $or: [
      { firstName: { $regex: name, $options: "i" } },
      { lastName: { $regex: name, $options: "i" } },
    ],
  });
  return users;
};