const Enrollment = require("../models/enrollment");

const getTopStudents = async (req, res) => {
  try {
    const topStudents = await Enrollment.aggregate([
      // Stage 1: Match only active enrollments (optional but recommended)
      {
        $match: { status: "active" }
      },

      // Stage 2: Group by studentId and count enrollments
      {
        $group: {
          _id: "$studentId",
          enrollmentCount: { $sum: 1 }
        }
      },

      // Stage 3: Sort by highest enrollment count
      {
        $sort: { enrollmentCount: -1 }
      },

      // Stage 4: Limit to top 5 students
      {
        $limit: 5
      },

      // Stage 5: Project required fields
      {
        $project: {
          _id: 0,
          studentId: "$_id",
          enrollmentCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: topStudents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top students analytics",
      error: error.message
    });
  }
};

module.exports = {
  getTopStudents
};