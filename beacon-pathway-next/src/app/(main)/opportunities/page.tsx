"use client";

import { useState } from "react";
import Link from "next/link";

// Sample opportunities data - would be fetched from Supabase in a real implementation
const opportunitiesData = [
  {
    id: 1,
    title: "Frontend Developer Internship",
    company: "TechCorp",
    type: "internship",
    location: "Boston, MA (Hybrid)",
    description:
      "Join our team to build modern web applications using React and Next.js. Perfect for computer science students interested in frontend development.",
    deadline: "May 30, 2025",
    tags: ["React", "JavaScript", "UI/UX"],
  },
  {
    id: 2,
    title: "STEM Excellence Scholarship",
    organization: "Future Leaders Foundation",
    type: "scholarship",
    amount: "$5,000",
    description:
      "Scholarship for undergraduates pursuing degrees in Science, Technology, Engineering, or Mathematics with a GPA of 3.5 or higher.",
    deadline: "April 15, 2025",
    tags: ["STEM", "Undergraduate", "Merit-based"],
  },
  {
    id: 3,
    title: "Research Assistant - Data Science",
    department: "Computer Science Department",
    type: "on-campus",
    location: "University Research Lab",
    description:
      "Assist faculty with data collection, analysis, and visualization for machine learning research projects.",
    hours: "10-15 hours per week",
    tags: ["Data Science", "Research", "Python"],
  },
  {
    id: 4,
    title: "Summer Software Engineering Internship",
    company: "Innovate Solutions",
    type: "internship",
    location: "Remote",
    description:
      "Develop and maintain backend services using Node.js and PostgreSQL. Work with senior engineers to implement new features and improve existing systems.",
    deadline: "March 31, 2025",
    tags: ["Backend", "Node.js", "SQL"],
  },
  {
    id: 5,
    title: "First Generation College Student Scholarship",
    organization: "Educational Equity Initiative",
    type: "scholarship",
    amount: "$3,000",
    description:
      "Scholarship supporting first-generation college students with demonstrated financial need and academic promise.",
    deadline: "June 1, 2025",
    tags: ["First-gen", "Need-based"],
  },
];

export default function OpportunitiesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOpportunities = opportunitiesData.filter((opportunity) => {
    // Apply type filter
    if (activeFilter !== "all" && opportunity.type !== activeFilter) {
      return false;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("internship")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "internship"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setActiveFilter("scholarship")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "scholarship"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Scholarships
          </button>
          <button
            onClick={() => setActiveFilter("on-campus")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "on-campus"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            On-Campus
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
            <p className="text-gray-600">
              No opportunities found matching your criteria.
            </p>
          </div>
        ) : (
          filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{opportunity.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    opportunity.type === "internship"
                      ? "bg-green-100 text-green-800"
                      : opportunity.type === "scholarship"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {opportunity.type.charAt(0).toUpperCase() +
                    opportunity.type.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                {opportunity.company && (
                  <p className="text-gray-700">
                    Company: {opportunity.company}
                  </p>
                )}
                {opportunity.organization && (
                  <p className="text-gray-700">
                    Organization: {opportunity.organization}
                  </p>
                )}
                {opportunity.department && (
                  <p className="text-gray-700">
                    Department: {opportunity.department}
                  </p>
                )}
                {opportunity.location && (
                  <p className="text-gray-700">
                    Location: {opportunity.location}
                  </p>
                )}
                {opportunity.amount && (
                  <p className="text-gray-700">Amount: {opportunity.amount}</p>
                )}
                {opportunity.hours && (
                  <p className="text-gray-700">Hours: {opportunity.hours}</p>
                )}
                {opportunity.deadline && (
                  <p className="text-gray-700">
                    Deadline: {opportunity.deadline}
                  </p>
                )}
              </div>

              <p className="text-gray-600 mb-4">{opportunity.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
