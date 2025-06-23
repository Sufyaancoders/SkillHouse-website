import React, { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses = [] }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Pre-defined color palette with good contrast
  const colorPalette = [
    "rgba(53, 162, 235, 0.8)",   // Blue
    "rgba(255, 99, 132, 0.8)",   // Pink
    "rgba(75, 192, 192, 0.8)",   // Teal
    "rgba(255, 159, 64, 0.8)",   // Orange
    "rgba(153, 102, 255, 0.8)",  // Purple
    "rgba(255, 205, 86, 0.8)",   // Yellow
    "rgba(201, 203, 207, 0.8)",  // Gray
    "rgba(54, 162, 125, 0.8)"    // Green
  ]

  // Function to get colors from palette with fallback to random
  const getChartColors = (numColors) => {
    // If we need more colors than in our palette, generate additional ones
    if (numColors <= colorPalette.length) {
      return colorPalette.slice(0, numColors)
    }
    
    // Fallback to generate more colors if needed
    return Array(numColors).fill().map((_, i) => 
      i < colorPalette.length 
        ? colorPalette[i] 
        : `rgba(${Math.floor(Math.random() * 200 + 30)}, ${Math.floor(Math.random() * 200 + 30)}, ${Math.floor(Math.random() * 200 + 30)}, 0.8)`
    )
  }

  // Check if courses data is available
  const hasValidData = Array.isArray(courses) && courses.length > 0

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: hasValidData ? courses.map((course) => course.courseName) : ["No Data"],
    datasets: [
      {
        data: hasValidData 
          ? courses.map((course) => course.totalStudentsEnrolled || 0) 
          : [1],
        backgroundColor: hasValidData ? getChartColors(courses.length) : [colorPalette[0]],
        borderWidth: 1,
        borderColor: '#334155', // slate-700
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: hasValidData ? courses.map((course) => course.courseName) : ["No Data"],
    datasets: [
      {
        data: hasValidData 
          ? courses.map((course) => course.totalAmountGenerated || 0) 
          : [1],
        backgroundColor: hasValidData ? getChartColors(courses.length) : [colorPalette[0]],
        borderWidth: 1,
        borderColor: '#334155', // slate-700
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0', // slate-200
          font: {
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (currChart === 'income') {
              label += 'Rs. ' + context.raw;
            } else {
              label += context.raw + ' students';
            }
            return label;
          }
        }
      },
      // Add accessibility
      htmlLegend: {
        containerID: 'chart-legend-container',
      }
    },
    responsive: true,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-slate-800 p-6">
      <p className="text-lg font-bold text-slate-100">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-md p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-slate-700 text-yellow-400"
              : "text-slate-300 hover:text-yellow-400"
          }`}
          aria-pressed={currChart === "students"}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-md p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-slate-700 text-yellow-400"
              : "text-slate-300 hover:text-yellow-400"
          }`}
          aria-pressed={currChart === "income"}
        >
          Income
        </button>
      </div>
      
      <div className="relative mx-auto aspect-square h-full w-full" 
           aria-label={`Pie chart showing ${currChart === "students" ? "student enrollment" : "income"} by course`}>
        {/* Chart container with fallback message */}
        {hasValidData ? (
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options={options}
            aria-label={`Pie chart of ${currChart} distribution across courses`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No data available to display chart
          </div>
        )}
      </div>
      
      {/* Hidden for screen readers to provide chart description */}
      <div id="chart-legend-container" className="sr-only">
        Chart showing distribution of {currChart === "students" ? "students" : "income"} across courses
      </div>
    </div>
  )
}