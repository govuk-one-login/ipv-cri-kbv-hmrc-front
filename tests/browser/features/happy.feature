Feature: Happy path

  Successful journey through the system and back to the RP

  @mock-api:single-question @single-amount
  Scenario: Happy Path for single-amount-question
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the single-amount-question page
    When they enter amount and continue from single-amount-question page
    Then they should be redirected as a success
