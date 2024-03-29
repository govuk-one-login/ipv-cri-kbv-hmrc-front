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

  @mock-api:taxCredits @taxCredits-journey
  Scenario: Happy Path for taxCredits-journey
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the enter-4-digits-bank-account-tax-credits question page
    When they enter amount and continue from the enter-4-digits-bank-account-tax-credits question page
    Then they should be redirected as a success
