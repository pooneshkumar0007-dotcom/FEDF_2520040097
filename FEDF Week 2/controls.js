import { state, setState, setEmployees } from "./state.js"; 
 
// Add Employee 
window.addEmployee = function () { 
    const name = prompt("Enter Name:"); 
     
    if (!name) return; 
 
    const newEmp = { 
        id: state.allEmployees.length + 1, 
        name, 
        score: 50, 
        present: true 
    }; 
 
    setEmployees([ ...state.allEmployees, newEmp ]); 
}; 
 
// Update Score 
window.updateScore = function () { 
 
    const id = Number(prompt("Enter Employee ID:")); 
    const newScore = prompt("Enter New Score:"); 
 
    if (!id || newScore === null) return; 
 
    const updated = state.allEmployees.map(emp => 
        emp.id === id 
            ? { ...emp, score: Number(newScore) } 
            : emp 
    ); 
 
    setEmployees(updated); 
}; 
 
window.editName = function (id) { 
    const name = prompt("Enter new name:"); 
 
    const updated = state.allEmployees.map(emp => 
        emp.id === id 
            ? { ...emp, name: name || emp.name } 
            : emp 
    ); 
 
    setEmployees(updated); 
}; 
 
window.editScore = function (id) { 
    const newScore = prompt("Enter new score:"); 
 
    if (newScore === null || newScore.trim() === "") return; 
 
    const score = Number(newScore); 
    if (Number.isNaN(score)) return; 
 
    const updated = state.allEmployees.map(emp => 
        emp.id === id 
            ? { ...emp, score } 
            : emp 
    ); 
 
    setEmployees(updated); 
}; 
 
// Attendance 
window.toggleAttendance = function (id) { 
    const updated = state.allEmployees.map(emp => 
        emp.id === id 
            ? { ...emp, present: !emp.present } 
            : emp 
    ); 
 
    setEmployees(updated); 
}; 
 
// Search 
window.searchEmployee = function (query) { 
 
    query = query.toLowerCase(); 
 
    if (query === "") { 
        // restore original data 
        setState({ employees: [ ...state.allEmployees ] }); 
        return; 
    } 
 
    const filtered = state.allEmployees.filter(emp => 
        emp.name.toLowerCase().includes(query) 
    ); 
 
    setState({ employees: filtered }); 
}; 
 
window.deleteEmployee = function (id) { 
 
    const updatedEmployees = state.allEmployees.filter(emp => emp.id !== id); 
 
    setEmployees(updatedEmployees); 
}; 
 
window.downloadPDF = function () { 
 
    const { jsPDF } = window.jspdf; 
    const doc = new jsPDF(); 
 
    // Title 
    doc.text("Employee Report", 14, 10); 
 
    // Table Data 
    const tableData = state.employees.map(emp => [ 
        emp.id, 
        emp.name, 
        emp.score, 
        emp.present ? "Present" : "Absent" 
    ]); 
 
    // Generate Table 
    doc.autoTable({ 
        head: [["ID", "Name", "Score", "Attendance"]], 
        body: tableData 
    }); 
 
    // Save PDF 
    doc.save("employees.pdf"); 
};