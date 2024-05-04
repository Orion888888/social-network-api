const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
    );
      res.json({thought:thought, user:updatedUser});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
//   async deleteCourse(req, res) {
//     try {
//       const course = await Course.findOneAndDelete({ _id: req.params.courseId });

//       if (!course) {
//         res.status(404).json({ message: 'No course with that ID' });
//       }

//       await Student.deleteMany({ _id: { $in: course.students } });
//       res.json({ message: 'Course and students deleted!' });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
  // Update a course
//   async updateCourse(req, res) {
//     try {
//       const course = await Course.findOneAndUpdate(
//         { _id: req.params.courseId },
//         { $set: req.body },
//         { runValidators: true, new: true }
//       );

//       if (!course) {
//         res.status(404).json({ message: 'No course with this id!' });
//       }

//       res.json(course);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
};
