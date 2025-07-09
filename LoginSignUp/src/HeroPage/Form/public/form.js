// // Get the disease select element and disease-related fields
// const diseaseSelect = document.getElementById('disease');
// const diseaseName = document.getElementById('disease_name');
// const diseaseNameLabel = document.getElementById('disease_name_label');
// const vetReport = document.getElementById('vet_report');
// const vetReportLabel = document.getElementById('vet_report_label');

// // Function to toggle the visibility and requirement of disease fields
// function toggleDiseaseFields() {
//     if (diseaseSelect.value === "no") {
//         // Hide the disease fields and remove the required attribute
//         diseaseName.style.display = 'none';
//         vetReport.style.display = 'none';
//         diseaseName.removeAttribute('required');
//         vetReport.removeAttribute('required');
//         diseaseNameLabel.style.display = 'none';
//         vetReportLabel.style.display = 'none';
//     } else if (diseaseSelect.value === "yes") {
//         // Show the disease fields and make them required
//         diseaseName.style.display = 'block';
//         vetReport.style.display = 'block';
//         diseaseName.setAttribute('required', true);
//         vetReport.setAttribute('required', true);
//         diseaseNameLabel.style.display = 'block';
//         vetReportLabel.style.display = 'block';
//     }
// }

// // Initially check the state and toggle fields accordingly
// toggleDiseaseFields();

// // Add event listener to toggle the fields when the user selects an option
// diseaseSelect.addEventListener('change', toggleDiseaseFields);
