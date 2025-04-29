"use client";

import { useState } from "react";

// Sample courses data - would be fetched from Supabase in a real implementation
const coursesData = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    credits: 3,
    days: ["Mon", "Wed"],
    time: "10:00 AM - 11:15 AM",
    instructor: "Dr. Smith",
  },
  {
    id: "MATH201",
    name: "Calculus I",
    credits: 4,
    days: ["Mon", "Wed", "Fri"],
    time: "11:30 AM - 12:20 PM",
    instructor: "Dr. Johnson",
  },
  {
    id: "ENG125",
    name: "College Composition",
    credits: 3,
    days: ["Tue", "Thu"],
    time: "1:00 PM - 2:15 PM",
    instructor: "Prof. Wilson",
  },
  {
    id: "BIO110",
    name: "Introduction to Biology",
    credits: 4,
    days: ["Mon", "Wed"],
    time: "2:30 PM - 3:45 PM",
    instructor: "Dr. Martinez",
  },
  {
    id: "HIST101",
    name: "World History I",
    credits: 3,
    days: ["Tue", "Thu"],
    time: "9:30 AM - 10:45 AM",
    instructor: "Dr. Lee",
  },
  {
    id: "PSYC100",
    name: "Introduction to Psychology",
    credits: 3,
    days: ["Mon", "Wed", "Fri"],
    time: "1:00 PM - 1:50 PM",
    instructor: "Dr. Taylor",
  },
  {
    id: "CHEM120",
    name: "General Chemistry",
    credits: 4,
    days: ["Mon", "Wed"],
    time: "4:00 PM - 5:15 PM",
    instructor: "Dr. Garcia",
  },
  {
    id: "CS210",
    name: "Data Structures",
    credits: 3,
    days: ["Tue", "Thu"],
    time: "11:00 AM - 12:15 PM",
    instructor: "Dr. Brown",
  },
];

type Course = (typeof coursesData)[0];

export default function ScheduleBuilderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [showScheduleConflicts, setShowScheduleConflicts] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      course.id.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query)
    );
  });

  const addCourse = (course: Course) => {
    if (selectedCourses.some((c) => c.id === course.id)) {
      return; // Course already added
    }
    setSelectedCourses([...selectedCourses, course]);
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.id !== courseId)
    );
  };

  const hasTimeConflict = (course: Course) => {
    return selectedCourses.some((selectedCourse) => {
      // Don't compare with itself
      if (selectedCourse.id === course.id) return false;

      // Check if days overlap
      const hasOverlappingDays = selectedCourse.days.some((day) =>
        course.days.includes(day)
      );

      if (!hasOverlappingDays) return false;

      // Simple time string comparison - in a real app you would parse these into Date objects
      return selectedCourse.time === course.time;
    });
  };

  const totalCredits = selectedCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Schedule Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Selection Panel */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredCourses.length === 0 ? (
                <p className="text-gray-500">No courses match your search.</p>
              ) : (
                filteredCourses.map((course) => {
                  const isSelected = selectedCourses.some(
                    (c) => c.id === course.id
                  );
                  const hasConflict = hasTimeConflict(course);

                  return (
                    <div
                      key={course.id}
                      className={`p-4 border rounded-md ${
                        isSelected
                          ? "bg-blue-50 border-blue-300"
                          : hasConflict && showScheduleConflicts
                          ? "bg-red-50 border-red-300"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {course.id}: {course.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {course.days.join(", ")} • {course.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {course.instructor} • {course.credits} credits
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            isSelected
                              ? removeCourse(course.id)
                              : addCourse(course)
                          }
                          disabled={!isSelected && hasConflict}
                          className={`px-3 py-1 rounded-md text-sm ${
                            isSelected
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : hasConflict
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }`}
                        >
                          {isSelected ? "Remove" : "Add"}
                        </button>
                      </div>

                      {hasConflict && showScheduleConflicts && (
                        <p className="text-sm text-red-600 mt-2">
                          Time conflict with another selected course.
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Schedule Panel */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Schedule</h2>
              <div className="text-sm text-gray-600">
                Total Credits:{" "}
                <span className="font-medium">{totalCredits}</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedCourses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your schedule is empty. Add courses from the list.
                </p>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="conflict-check"
                      checked={showScheduleConflicts}
                      onChange={() =>
                        setShowScheduleConflicts(!showScheduleConflicts)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="conflict-check"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Show schedule conflicts
                    </label>
                  </div>

                  {/* Schedule by Day */}
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
                    const coursesOnDay = selectedCourses.filter((course) =>
                      course.days.includes(day)
                    );

                    if (coursesOnDay.length === 0) return null;

                    return (
                      <div key={day} className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">{day}</h3>
                        <div className="space-y-2">
                          {coursesOnDay.map((course) => (
                            <div
                              key={course.id}
                              className="flex justify-between items-center bg-gray-50 p-2 rounded"
                            >
                              <div>
                                <p className="font-medium">{course.id}</p>
                                <p className="text-sm text-gray-600">
                                  {course.time}
                                </p>
                              </div>
                              <button
                                onClick={() => removeCourse(course.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={selectedCourses.length === 0}
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
