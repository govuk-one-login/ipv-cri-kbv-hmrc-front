Feature: Happy path

  Successful journey through the system and back to the RP

  @mock-api:payslips @payslips-journey
  Scenario: Happy Path for payslips-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the Enter NI Payslip question page
    When they enter amount and continue from the Enter NI Payslip question page
    Then they should see the Enter Tax Payslip question page
    When they enter amount and continue from the Enter Tax Payslip question page
    Then they should be redirected as a success

  @mock-api:p60 @p60-journey
  Scenario: Happy Path for p60-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the "enter-total-for-year-p60" question page
    When they enter amount and continue from the "enter-total-for-year-p60" question page
    Then they should see the "enter-earnings-above-pt-p60" question page
    When they enter amount and continue from the "enter-earnings-above-pt-p60" question page
    Then they should see the "enter-postgraduate-loan-deductions-p60" question page
    When they enter amount and continue from the "enter-postgraduate-loan-deductions-p60" question page
    Then they should see the "enter-statutory-shared-parental-pay-p60" question page
    When they enter amount and continue from the "enter-statutory-shared-parental-pay-p60" question page
    Then they should be redirected as a success

@mock-api:selfAssessment @selfAssessment-journey
  Scenario: Happy Path for selfAssessment-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the what-type-self-assessment question page
    When they select "sa200" and continue from the what-type-self-assessment question page

  @mock-api:taxCredits @taxCredits-journey
  Scenario: Happy Path for taxCredits-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the enter-4-digits-bank-account-tax-credits question page
    When they do not enter an account number and continue from the enter-4-digits-bank-account-tax-credits question page
    Then they should see enter account number error message
    When they enter an invalid account number and continue from the enter-4-digits-bank-account-tax-credits question page
    Then they should see enter correct account number error message
    When they enter correct account number and continue from the enter-4-digits-bank-account-tax-credits question page
    Then they should be redirected as a success
