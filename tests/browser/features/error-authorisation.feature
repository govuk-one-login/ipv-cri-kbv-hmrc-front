Feature: Error handling

  API Errors in the middle of the journey


  # As intro page has been removed, authorization path will fail until questions implemented
  @mock-api:authorization-error @skip
  Scenario: Session error
    Given Error Eric is using the system
    And they have started the journey
    Then they should see the intro page
    When they continue from intro
    Then they should be redirected as an error with a description "gateway"
