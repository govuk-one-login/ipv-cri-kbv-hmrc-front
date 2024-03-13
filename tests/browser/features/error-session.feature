Feature: Error handling

  API Errors at the start of the journey

  @mock-api:session-500
  Scenario: Session error
    Given Error Eric is using the system
    And they have started the journey
    Then they should see the unrecoverable error page
