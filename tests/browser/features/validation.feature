Feature: Validation scenarios

  @mock-api:questions-p60 @p60-journey
  Scenario: Validation Path for p60-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the "enter-total-for-year-p60" question page
    When they do not enter an amount and continue from the "enter-total-for-year-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-total-for-year-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234.45" and continue from the "enter-total-for-year-p60" question page
    Then they should see the "enter-earnings-above-pt-p60" question page
    When they do not enter an amount and continue from the "enter-earnings-above-pt-p60" question page
    Then they should see enter amount error message
    When they enter an invalid amount and continue from the "enter-earnings-above-pt-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-earnings-above-pt-p60" question page
    Then they should see the "enter-postgraduate-loan-deductions-p60" question page
    When they do not enter an amount and continue from the "enter-postgraduate-loan-deductions-p60" question page
    Then they should see enter amount error message
    When they enter an invalid amount and continue from the "enter-postgraduate-loan-deductions-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-postgraduate-loan-deductions-p60" question page
    Then they should see the "enter-statutory-shared-parental-pay-p60" question page
    When they do not enter an amount and continue from the "enter-statutory-shared-parental-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-statutory-shared-parental-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234.45" and continue from the "enter-statutory-shared-parental-pay-p60" question page
    Then they should see the "enter-statutory-adoption-pay-p60" question page
    When they do not enter an amount and continue from the "enter-statutory-adoption-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-statutory-adoption-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234.45" and continue from the "enter-statutory-adoption-pay-p60" question page
    Then they should see the "enter-statutory-maternity-pay-p60" question page
    When they do not enter an amount and continue from the "enter-statutory-maternity-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-statutory-maternity-pay-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234.45" and continue from the "enter-statutory-maternity-pay-p60" question page
    Then they should see the "enter-student-loan-deductions-p60" question page
    When they do not enter an amount and continue from the "enter-student-loan-deductions-p60" question page
    Then they should see enter amount error message
    When they enter an invalid amount and continue from the "enter-student-loan-deductions-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-student-loan-deductions-p60" question page
    Then they should see the "enter-employees-contributions-p60" question page
    When they do not enter an amount and continue from the "enter-employees-contributions-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234" and continue from the "enter-employees-contributions-p60" question page
    Then they should see enter amount error message
    When they enter amount "1234.45" and continue from the "enter-employees-contributions-p60" question page
    Then they should be redirected as a success

  @mock-api:questions-selfAssessment @selfAssessment-journey
  Scenario: Validation Path for selfAssessment-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the what-type-self-assessment question page
    When they select "sa200" and continue from the what-type-self-assessment question page
    Then they should see the pensions-benefits-short-tax-return question page
    When they enter correct pension details
    Then they should see the enter-recent-self-assessment-payment question page
    When they enter wrong self assessment payment details
    Then they should see the enter-recent-self-assessment-payment question page with error
    When they enter correct self assessment payment details
    Then they should be redirected as a success
