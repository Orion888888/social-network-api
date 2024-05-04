const {User} = require('../models');

module.exports = {
    // Get all students
    async getUsers(req, res) {
      try {
        const users = await User.find().populate('friends').populate('thoughts');
  
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single student
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
    // create a new student
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a student and remove them from the course
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
    }
  };