const {User} = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find().populate('friends').populate('thoughts');
  
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v').populate('friends').populate('thoughts');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // update user information
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'No user with this ID' });
        }
    
        res.json(updatedUser);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // Delete a user and remove them from the course
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
  
        // const course = await Course.findOneAndUpdate(
        //   { students: req.params.studentId },
        //   { $pull: { students: req.params.studentId } },
        //   { new: true }
        // );
  
        // if (!course) {
        //   return res.status(404).json({
        //     message: 'Student deleted, but no courses found',
        //   });
        // }
  
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // add friends to user's friends array
    async addFriend(req, res) {
        try{
        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!updateUser){
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(updateUser);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    },
    	// Remove a friend from a user's friends array
	async deleteFriend(req, res) {
		try {
			const updateUserData = await User.findOneAndUpdate(
				{ _id: req.params.userId},
				{$pull: { friends: req.params.friendId }},
				{ runValidators: true, new: true }
			);

			if (!updateUserData) {
				return res.status(404).json({ message: 'No user found with that id value' });
			};
			res.status(200).json(updateUserData)
		} catch (err) {
			res.status(500).json(err);
		}
	}
}