Feature: Happy path

  Journey through the system with insufficient questions and back to the RP

  @mock-api:insufficient-questions
  Scenario: Happy Path
    Given Insufficient Ian is using the system
    When they have started the journey
    Then they should be redirected as a success
