Feature: Error handling

  API Errors at the start of the journey

  @mock-api:session-500
  Scenario: Session error
    Given Error Eric is using the system
    And they have started the journey
    When there is an immediate error
    Then they should see the unrecoverable error page
