@mock-api:abandon @prove-identity-another-way
Feature: Prove identity another way

  Background:
    Given Happy Harriet is using the system
    And they have started the journey
    Then they should see the answer security questions page
    When they continue from answer security questions
    Then they should see the single-amount-question page
    When they click on the abandon link from single-amount-question page
    Then they should see the abandon page

  Scenario: Validation on prove identity another way page
    When they click continue from prove identity another way
    Then they should see prove identity another way validation messages

  Scenario: Choose to return to answering question page
    Given they choose to return to answering question option
    When they click continue from prove identity another way
    Then they should see the single-amount-question page

  @mock-api:access-denied
  Scenario: Stop answering questions
    Given they choose to abandon
    When they click continue from prove identity another way
    Then they should be redirected as access denied
