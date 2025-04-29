"use client";

import { useState } from "react";
import Image from "next/image";

// Sample community members data - would be fetched from Supabase in a real implementation
const communityMembersData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Student",
    major: "Computer Science",
    year: "Junior",
    interests: ["Web Development", "AI", "Open Source"],
    bio: "CS student passionate about creating accessible web applications and contributing to open-source projects.",
    avatar: "/placeholder-avatar.png",
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    role: "Mentor",
    department: "Computer Science",
    expertise: ["Data Science", "Machine Learning", "Research Methods"],
    bio: "Professor specializing in machine learning with 10+ years of industry experience. Excited to help students navigate research opportunities.",
    avatar: "/placeholder-avatar.png",
  },
  {
    id: 3,
    name: "Miguel Rodriguez",
    role: "Student",
    major: "Business Administration",
    year: "Senior",
    interests: ["Entrepreneurship", "Digital Marketing", "Finance"],
    bio: "Business student with a side project in e-commerce. Looking to connect with peers interested in startups.",
    avatar: "/placeholder-avatar.png",
  },
  {
    id: 4,
    name: "Jessica Williams",
    role: "Alumni",
    company: "TechInnovate",
    position: "Software Engineer",
    graduated: "2022",
    interests: ["Career Development", "Mentoring", "Full-stack Development"],
    bio: "Recent graduate working as a full-stack developer. Happy to provide guidance on job searching and interview preparation.",
    avatar: "/placeholder-avatar.png",
  },
  {
    id: 5,
    name: "Prof. David Kim",
    role: "Mentor",
    department: "Business School",
    expertise: ["Entrepreneurship", "Venture Capital", "Business Strategy"],
    bio: "Business professor with extensive background in startup consulting. Dedicated to helping students develop their business ideas.",
    avatar: "/placeholder-avatar.png",
  },
];

// Sample discussion posts data
const discussionPostsData = [
  {
    id: 1,
    author: {
      id: 3,
      name: "Miguel Rodriguez",
      role: "Student",
      avatar: "/placeholder-avatar.png",
    },
    title: "Networking tips for tech conferences?",
    content:
      "I'm attending my first tech conference next month and would appreciate any advice on making the most of networking opportunities.",
    timestamp: "2 hours ago",
    comments: 8,
    likes: 12,
  },
  {
    id: 2,
    author: {
      id: 4,
      name: "Jessica Williams",
      role: "Alumni",
      avatar: "/placeholder-avatar.png",
    },
    title: "Job search resources for recent graduates",
    content:
      "I've compiled a list of job search resources that helped me land my first role after graduation. Check it out and let me know if you have any questions!",
    timestamp: "1 day ago",
    comments: 15,
    likes: 27,
  },
];

type TabType = "community" | "discussions" | "events" | "resources";

export default function BeaconCommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("community");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = communityMembersData.filter((member) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      (member.major && member.major.toLowerCase().includes(query)) ||
      (member.bio && member.bio.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Beacon Community</h1>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "community"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("community")}
          >
            Community
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "discussions"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("discussions")}
          >
            Discussions
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "events"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "resources"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </div>
      </div>

      {activeTab === "community" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Community Members</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    {/* Placeholder for avatar, using a gray circle for now */}
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>

                <div className="mb-4">
                  {member.major && (
                    <p className="text-sm">
                      <span className="font-medium">Major:</span> {member.major}
                    </p>
                  )}
                  {member.year && (
                    <p className="text-sm">
                      <span className="font-medium">Year:</span> {member.year}
                    </p>
                  )}
                  {member.department && (
                    <p className="text-sm">
                      <span className="font-medium">Department:</span>{" "}
                      {member.department}
                    </p>
                  )}
                  {member.company && (
                    <p className="text-sm">
                      <span className="font-medium">Company:</span>{" "}
                      {member.company}
                    </p>
                  )}
                  {member.position && (
                    <p className="text-sm">
                      <span className="font-medium">Position:</span>{" "}
                      {member.position}
                    </p>
                  )}
                </div>

                {member.interests && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.expertise && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "discussions" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Discussions</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              New Discussion
            </button>
          </div>

          <div className="space-y-6">
            {discussionPostsData.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-xs text-gray-500">
                      {post.author.role} • {post.timestamp}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <span>👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <span>💬</span>
                      <span>{post.comments} comments</span>
                    </button>
                  </div>
                  <button className="hover:text-blue-600">Share</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "events" && (
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
          <h2 className="text-xl font-semibold mb-4">Events Coming Soon</h2>
          <p className="text-gray-600">
            We're working on bringing community events to the platform. Check
            back soon!
          </p>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
          <h2 className="text-xl font-semibold mb-4">Resources Coming Soon</h2>
          <p className="text-gray-600">
            Community resources will be available soon. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}
