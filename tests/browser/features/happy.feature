Feature: Happy path

  Successful journey through the system and back to the RP

  # As intro page has been removed, success path will fail until questions implemented
  @mock-api:success @skip
  Scenario: Happy Path
    Given Happy Harriet is using the system
    When they have started the journey
    Then they should see the intro page
    And they continue from intro
    Then they should be redirected as a success
