// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = 'Manager';
        this.getRole = () => {
            console.log(`This employee's role = ${this.role}`);
            return this.role;
        }
        this.getOfficeNumber = () => {
            console.log(`This employee's office number = ${this.officeNumber}`);
            return this.officeNumber;
        }
    };
};

module.exports = Manager; 