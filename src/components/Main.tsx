import {
  Center,
  Container,
  Text,
  Heading,
  Textarea,
  Button,
  VStack,
  Box,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import PackageInfo from "./PackageInfo";

export default function Main() {
  /**
   * Content of requirements.txt file
   */
  const [requirementsContent, setRequirementsContent] = useState("");

  /**
   * if requirements content is submitted for processing
   */
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Get package names from requirements.txt
   * @returns packages
   */
  function getPackageNames() {
    /**
     * Wheter or not line contains package version specifier.
     * Under the assumption line can have only one specifier
     * @param line line from requirements.txt
     */
    function indexOfSpecifier(line: string): number {
      const specifiers = ["~=", "==", "!=", "<=", ">=", "<", ">", "==="];
      const indexes = specifiers.map(specifier => line.indexOf(specifier));
      return Math.max(...indexes);
    }

    /**
     * Check if line from requirements.txt file is a comment, rather
     * than package version
     * @param line requirements line
     * @returns if line is comment
     */
    function checkIfComment(line: string): boolean {
      const isComment = line.trim().startsWith("#");
      return isComment;
    }

    // get package names from requirements
    const packages = requirementsContent
      .split("\n")
      .filter(line => !checkIfComment(line))
      .map(line => {
        const specifierIndex = indexOfSpecifier(line);
        if (specifierIndex > -1)
          return line.substring(0, specifierIndex).trim();
        else return line.trim();
      });
    return packages;
  }

  function handleSubmit() {
    setIsSubmitted(true);
  }

  function handlePasteNew() {
    setIsSubmitted(false);
    setRequirementsContent("");
  }

  return (
    <>
      <Box fontFamily={"Source Sans Pro,Helvetica,arial,sans-serif"}>
        <Center bgColor={"#0073b7"} padding={4} color={"gray.50"}>
          <Heading>Python requirements.txt packages info</Heading>
        </Center>
        <Container marginTop={8}>
          {!isSubmitted && (
            <Stack>
              <Flex>
                <Text>Paste requirements.txt here:</Text>
                <Spacer />
                <Button
                  size={"sm"}
                  variant="outline"
                  fontWeight={"light"}
                  borderRadius="sm"
                >
                  Clear
                </Button>
              </Flex>
              <Textarea
                onChange={e => setRequirementsContent(e.target.value)}
                value={requirementsContent}
                rows={20}
                borderRadius="sm"
              ></Textarea>

              <Button
                onClick={handleSubmit}
                width={"full"}
                colorScheme="facebook"
                borderRadius={"sm"}
              >
                Submit
              </Button>
            </Stack>
          )}
          {isSubmitted && (
            <Stack>
              {getPackageNames().map(name => (
                <>
                  <PackageInfo name={name} key={name} />
                </>
              ))}
              <Button
                onClick={handlePasteNew}
                colorScheme={"facebook"}
                borderRadius="sm"
              >
                Paste new
              </Button>
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
}
