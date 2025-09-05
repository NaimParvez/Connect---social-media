import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    // Logic to get recommended users
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },// Exclude current user
        { _id: { $nin: currentUser.friends } },// Exclude friends
        { isOnboarded: true } // Only include onboarded users
      ]
    });
    res.status(200).json( recommendedUsers);

  } catch (error) {
    console.log("Error occurred while getting recommended users:", error);
    res.status(500).json({message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    // Logic to get user's friends
    const user = await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json(user.friends );

  } catch (error) {
    console.error("Error occurred while getting user's friends:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId =req.user.id;
        const { id:recipientId } = req.params;

       //prevent sending request to yourself
       if (myId === recipientId) {
           return res.status(400).json({ message: "You cannot send a friend request to yourself." });
       }
        // Find the recipient user
        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found." });
        }

        // Check if user is already friends with recipient
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }

        // Check if friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already sent." });
        }

        // Create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json( friendRequest );
    } catch (error) {
        console.error("Error occurred while sending friend request:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const userId = req.user.id;

        // Find the friend request
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found." });
        }

        // Check if the request is for the current user
        if (friendRequest.recipient.toString() !== userId) {
            return res.status(403).json({ message: "You cannot accept this friend request." });
        }
        // Update the friend request status to accepted
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add the users to each other's friends list
        await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendRequest.sender } });
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: userId } });

        //if any error happens in friend list see 1.51.21 timestamp

        // Delete the friend request
        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: "Friend request accepted." });
    } catch (error) {
        console.error("Error occurred while accepting friend request:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequest(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({ 
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage"); 

        const acceptedReqs = await FriendRequest.find({ 
            recipient: req.user.id,
            status: "accepted",
        }).populate("sender", "fullName profilePic ");

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.log("Error occurred while getting friend requests:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export async function getOutgoingFriendReqs(req, res) {
    try {
        
    } catch (error) {
        
    }
    
}