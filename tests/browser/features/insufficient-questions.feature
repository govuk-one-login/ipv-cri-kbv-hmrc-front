Feature: Insufficient questions

  Insufficient questions when fetching questions at start of journey

  @mock-api:insufficient-questions
  Scenario: Insufficient questions
    Given Error Eric is using the system
    And they have started the journey
    Then they should be redirected as an error with code invalid_request
