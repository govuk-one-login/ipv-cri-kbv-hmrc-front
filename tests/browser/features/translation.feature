@mock-api:session-500 @translation
Feature: Translation from Welsh to English and back

  The page should get translated into the correct language, when changed using cookies or the language toggle.

  Background:
    Given Error Eric is using the system
    And they have started the journey
    When there is an immediate error
    Then they should see the unrecoverable error page

  Scenario: English to Welsh with cookies only
    Given they set the language to "English" using cookies
    And they see the page in "English"
    When they set the language to "Welsh" using cookies
    Then they should see the page in "Welsh"
    Then the page's language property should be "Welsh"

  Scenario: Welsh to English with cookies only
    Given they set the language to "Welsh" using cookies
    And they see the page in "Welsh"
    When they set the language to "English" using cookies
    Then they should see the page in "English"
    Then the page's language property should be "English"

  Scenario: English to Welsh with the language toggle
    Given they set the language to "English" using cookies
    And they see the page in "English"
    When they set the language to "Welsh" using the toggle
    Then they should see the page in "Welsh"
    Then the page's language property should be "Welsh"

  Scenario: Welsh to English with the language toggle
    Given they set the language to "Welsh" using cookies
    And they see the page in "Welsh"
    When they set the language to "English" using the toggle
    Then they should see the page in "English"
    Then the page's language property should be "English"
