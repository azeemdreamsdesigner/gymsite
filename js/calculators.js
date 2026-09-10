/* ==========================================================================
   FISTA FITNESS - CALCULATORS JAVASCRIPT MODULE
   Includes Full BMI & Mifflin-St Jeor BMR / TDEE Calculation Algorithms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Full BMI Calculator Algorithm
     -------------------------------------------------------------------------- */
  const fullBmiForm = document.getElementById('fullBmiForm');

  if (fullBmiForm) {
    fullBmiForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const heightCm = parseFloat(document.getElementById('fullBmiHeight').value);
      const weightKg = parseFloat(document.getElementById('fullBmiWeight').value);

      if (heightCm > 0 && weightKg > 0) {
        const heightM = heightCm / 100;
        const bmi = (weightKg / (heightM * heightM)).toFixed(1);

        const bmiVal = document.getElementById('fullBmiVal');
        const bmiCat = document.getElementById('fullBmiCategory');
        const bmiAdvice = document.getElementById('fullBmiAdvice');

        if (bmiVal) bmiVal.textContent = bmi;

        let category = '';
        let advice = '';

        if (bmi < 18.5) {
          category = 'Underweight';
          advice = 'Consider a caloric surplus focusing on lean protein and compound strength training at Fista Fitness.';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          category = 'Healthy / Normal Weight';
          advice = 'Excellent body composition! Maintain your fitness momentum with our Pro training routines.';
        } else if (bmi >= 25 && bmi <= 29.9) {
          category = 'Overweight';
          advice = 'Combining our Hyper HIIT Burn sessions with balanced nutrition will help trim body fat.';
        } else {
          category = 'Obese Range';
          advice = 'Consult our certified personal coaches for a personalized low-impact fat loss plan.';
        }

        if (bmiCat) bmiCat.textContent = category;
        if (bmiAdvice) bmiAdvice.textContent = advice;

        if (typeof showToast === 'function') {
          showToast(`BMI Calculated: ${bmi} (${category})`, 'success');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. BMR & TDEE Caloric Intake Calculator (Mifflin-St Jeor Equation)
     -------------------------------------------------------------------------- */
  const tdeeForm = document.getElementById('tdeeForm');

  if (tdeeForm) {
    tdeeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const gender = document.getElementById('tdeeGender').value;
      const age = parseFloat(document.getElementById('tdeeAge').value);
      const height = parseFloat(document.getElementById('tdeeHeight').value);
      const weight = parseFloat(document.getElementById('tdeeWeight').value);
      const activityMultiplier = parseFloat(document.getElementById('tdeeActivity').value);

      if (age > 0 && height > 0 && weight > 0) {
        // Mifflin-St Jeor Equation
        // BMR (Male) = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
        // BMR (Female) = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        if (gender === 'male') {
          bmr += 5;
        } else {
          bmr -= 161;
        }

        const tdee = Math.round(bmr * activityMultiplier);
        const fatLossCalories = Math.round(tdee - 500);
        const muscleGainCalories = Math.round(tdee * 1.10);

        const tdeeVal = document.getElementById('tdeeVal');
        const bmrVal = document.getElementById('bmrVal');
        const tdeeFatLoss = document.getElementById('tdeeFatLoss');
        const tdeeGain = document.getElementById('tdeeGain');

        if (tdeeVal) tdeeVal.textContent = `${tdee} kcal`;
        if (bmrVal) bmrVal.textContent = `BMR: ${Math.round(bmr)} kcal/day`;
        if (tdeeFatLoss) tdeeFatLoss.textContent = `${fatLossLoss(fatLossCalories)} kcal`;
        if (tdeeGain) tdeeGain.textContent = `${muscleGainCalories} kcal`;

        if (typeof showToast === 'function') {
          showToast(`Maintenance TDEE: ${tdee} Calories/day`, 'success');
        }
      }
    });
  }

  function fatLossLoss(val) {
    return val > 1200 ? val : 1200; // Safe minimum floor
  }

});
