document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feeForm');
    const tuition = document.getElementById('tuition');
    const hostel = document.getElementById('hostel');
    const total = document.getElementById('total');

    function calculateTotal() {
        const t = parseFloat(tuition.value) || 0;
        const h = parseFloat(hostel.value) || 0;
        total.value = (t + h).toFixed(2);
    }

    tuition.addEventListener('input', calculateTotal);
    hostel.addEventListener('input', calculateTotal);

    // Form submit validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let errors = [];

        // 1. Enrollment Number - required
        const enrollment = document.getElementById('enrollment').value.trim();
        if (!enrollment) {
            errors.push('Enrollment Number is required');
        }

        // 2. Full Name - required
        const name = document.getElementById('name').value.trim();
        if (!name) {
            errors.push('Full Name is required');
        }

        // 3. Email - required and valid format
        const email = document.getElementById('email').value.trim();
        if (!email) {
            errors.push('Email is required');
        } else if (!isValidEmail(email)) {
            errors.push('Email format is invalid');
        }

        // 4. Phone - required and exactly 10 digits
        const phone = document.getElementById('phone').value.trim();
        if (!phone) {
            errors.push('Phone is required');
        } else if (!/^\d{10}$/.test(phone.replace(/[^\d]/g, ''))) {
            errors.push('Phone must be exactly 10 digits');
        }

        // 5. Program - required
        const program = document.getElementById('program').value;
        if (!program) {
            errors.push('Program is required');
        }

        // 6. Semester - required
        const semester = document.getElementById('semester').value;
        if (!semester) {
            errors.push('Semester is required');
        }

        // 7. Tuition Fee - required and greater than 0
        const tuitionVal = parseFloat(tuition.value);
        if (!tuition.value) {
            errors.push('Tuition Fee is required');
        } else if (tuitionVal <= 0) {
            errors.push('Tuition Fee must be greater than 0');
        }

        // 8. Hostel Fee - optional but must be valid if filled
        const hostelVal = document.getElementById('hostel').value.trim();
        if (hostelVal && parseFloat(hostelVal) < 0) {
            errors.push('Hostel Fee cannot be negative');
        }

        // 9. Payment Mode - required
        const paymentMode = document.getElementById('paymentMode').value;
        if (!paymentMode) {
            errors.push('Payment Mode is required');
        }

        // 10. Transaction ID - required
        const transactionId = document.getElementById('transactionId').value.trim();
        if (!transactionId) {
            errors.push('Transaction ID is required');
        }

        // 11. Payment Date - required
        const paymentDate = document.getElementById('paymentDate').value;
        if (!paymentDate) {
            errors.push('Payment Date is required');
        }

        // 12. Declaration - must be checked
        const declaration = document.getElementById('declaration');
        if (!declaration.checked) {
            errors.push('You must declare that all information is true and accurate');
        }

        // 13. Submission Date - required
        const submissionDate = document.getElementById('submissionDate').value;
        if (!submissionDate) {
            errors.push('Submission Date is required');
        }

        // If there are errors, show them
        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.map((err, i) => (i + 1) + '. ' + err).join('\n'));
            return false;
        }

        // All validation passed
        const totalAmount = total.value;
        alert(`Form submitted successfully!\n\nTotal Fee: ₹${totalAmount}\n\nThank you for your submission!`);
        return false;
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});