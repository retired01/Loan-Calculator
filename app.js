//Listen for event from the submit button;
document.querySelector('.btn-block').addEventListener('click', function(e){
   //Hide Results
   document.querySelector('#results').style.display = 'none';
   //Show image Loader
   document.querySelector('#loading').style.display = 'block';
   //Set timeout
   setTimeout(calculateResults, 3000);

   e.preventDefault();
});

//Calculate Results Function
function calculateResults() {
   //Get the Loan Amount
   
   let amount = document.querySelector('#amount');
   let interest = document.querySelector('#interest');
   let years = document.querySelector('#years');

   //Results Variables
   const monthlyPayment = document.querySelector('#monthly-payment');
   const totalPayment = document.querySelector('#total-payment');
   const totalInterest = document.querySelector('#total-interest');

   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value)/100/12;
   const calculatedPayments = parseFloat(years.value)*12;

   //Compute Monthly Payments
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (principal*x*calculatedInterest)/(x-1);

   if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      //Show results
      document.querySelector('#results').style.display = 'block';
      //Hide Loader
      document.querySelector('#loading').style.display = 'none';
   } else {
      showError ('Please check your numbers')
   }
   function showError(error) {
      //Hide results
      document.querySelector('#results').style.display = 'none';
      //Hide Loader
      document.querySelector('#loading').style.display = 'none';
      //Create Div Element
      const errorDiv = document.createElement('div');
      //Get Elements
      const card = document.querySelector('.card');
      const head = document.querySelector('.heading')
      //Add Class
      errorDiv.classList = 'alert alert-danger';
      //Create text node and append to div
      errorDiv.appendChild(document.createTextNode(error));
      //Insert Error
      card.insertBefore(errorDiv, head);
      //Set Time out for Error
      setTimeout(clearError, 3000);
   }
   
   function clearError() {
      document.querySelector('.alert').remove();
   }

   
}

  
