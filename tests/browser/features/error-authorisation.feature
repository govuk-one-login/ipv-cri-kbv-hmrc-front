Feature: Error handling

  API Errors in the middle of the journey

  @mock-api:authorization-error
  Scenario: Session error
    Given Error Eric is using the system
    And they have started the journey
    Then they should see the intro page
    And they continue from intro
    Then they should be redirected as an error with a description "gateway"
