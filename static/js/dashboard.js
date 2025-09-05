document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Chart Initialization ---

  // Weekly Footfall (Line Chart)
  new Chart(document.getElementById('weeklyFootfall'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Visitors',
        data: [12, 19, 14, 22, 30, 18, 25],
        borderColor: 'rgb(59,130,246)',
        fill: true,
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // Hourly Distribution (Bar Chart)
  new Chart(document.getElementById('hourlyDistribution'), {
    type: 'bar',
    data: {
      labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
      datasets: [{
        label: 'Entries',
        data: [5, 8, 12, 15, 9, 7, 11, 6, 3],
        backgroundColor: 'rgb(16,185,129)'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 2 } } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // Branch/Year Usage (Pie Chart)
  new Chart(document.getElementById('branchUsage'), {
    type: 'pie',
    data: {
      labels: ['CSE', 'AIML', 'ECE', 'ME'],
      datasets: [{
        data: [35, 25, 20, 20],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'right' }, tooltip: { enabled: true } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // Average Stay Duration (Bar Chart)
  new Chart(document.getElementById('avgStay'), {
    type: 'bar',
    data: {
      labels: ['0-15m', '15-30m', '30-60m', '1-2h', '2h+'],
      datasets: [{
        label: 'Students',
        data: [10, 15, 8, 5, 2],
        backgroundColor: 'rgb(139,92,246)'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 2 } } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // Top Visitors (Horizontal Bar Chart)
  new Chart(document.getElementById('topVisitors'), {
    type: 'bar',
    data: {
      labels: ['Sameer', 'Aryan', 'Mohit', 'Kshitij'],
      datasets: [{
        label: 'Visits',
        data: [12, 10, 8, 6],
        backgroundColor: 'rgb(234,179,8)'
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: { x: { beginAtZero: true, ticks: { stepSize: 2 } } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // Monthly Trend (Line Chart)
  new Chart(document.getElementById('monthlyTrend'), {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Visitors',
        data: [100, 120, 150, 130, 170, 160],
        borderColor: 'rgb(239,68,68)',
        fill: true,
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } },
      animation: { duration: 600, easing: 'easeInOutQuad' }
    }
  });

  // --- Existing Refresh Button Handler ---

  document.getElementById('refreshBtn').addEventListener('click', () => {
    alert('Refresh clicked. Data fetching to be implemented.');
  });

  // --- Export Modal Flow Code ---

  const exportBtn = document.getElementById('exportBtn');
  const exportModal = document.getElementById('exportModal');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');
  const exportCancelBtn = document.getElementById('exportCancelBtn');

  const excelDateModal = document.getElementById('excelDateModal');
  const excelDateForm = document.getElementById('excelDateForm');
  const dateOptions = excelDateForm.elements['dateOption'];
  const customDateInputs = document.getElementById('customDateInputs');
  const excelDateCancelBtn = document.getElementById('excelDateCancelBtn');

  exportBtn.addEventListener('click', () => {
    exportModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  exportCancelBtn.addEventListener('click', closeAllModals);
  excelDateCancelBtn.addEventListener('click', closeAllModals);

  [...dateOptions].forEach(radio => {
    radio.addEventListener('change', () => {
      if (excelDateForm.dateOption.value === 'custom') {
        customDateInputs.classList.remove('hidden');
      } else {
        customDateInputs.classList.add('hidden');
      }
    });
  });

  exportPdfBtn.addEventListener('click', () => {
    closeAllModals();
    exportPageAsPDF();
  });

  exportExcelBtn.addEventListener('click', () => {
    exportModal.classList.add('hidden');
    excelDateModal.classList.remove('hidden');
  });

  excelDateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dateOption = excelDateForm.dateOption.value;
    let startDate, endDate;

    if (dateOption === 'today') {
      startDate = endDate = new Date().toISOString().slice(0, 10);
    } else {
      startDate = excelDateForm.startDate.value;
      endDate = excelDateForm.endDate.value;

      if (!startDate || !endDate || startDate > endDate) {
        alert('Please select a valid date range.');
        return;
      }
    }

    closeAllModals();
    exportExcelForDateRange(startDate, endDate);
  });

  function closeAllModals() {
    exportModal.classList.add('hidden');
    excelDateModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (!exportModal.classList.contains('hidden') || !excelDateModal.classList.contains('hidden'))) {
      closeAllModals();
    }
  });

  function exportPageAsPDF() {
    alert('PDF export functionality to be implemented.');
    // Example:
    // html2pdf().from(document.body).save('dashboard.pdf');
  }

  function exportExcelForDateRange(start, end) {
    alert(`Export Excel from ${start} to ${end} - functionality to be implemented.`);
    // Example:
    // Call backend API or use SheetJS for frontend export
  }
});
