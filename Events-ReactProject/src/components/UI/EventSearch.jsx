import { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";

export const EventSearch = ({ events }) => {
  // Searchfield
  const [searchField, setSearchField] = useState("");
  const handleChange = (event) => setSearchField(event.target.value);
  const handleRefresh = () => window.location.reload(false);

  // Filter on category
  const [value, setValue] = useState("all");
  let eventsMassaged;

  const filterEvents = (categoryNumber) => {
    const eventsMassaged = events.filter((event) => {
      let categories = JSON.stringify(event.categoryIds);
      return categories.includes(
        Number(categoryNumber) || String(categoryNumber)
      );
    });
    return eventsMassaged;
  };

  switch (value) {
    case "1":
      eventsMassaged = filterEvents(1);
      break;
    case "2":
      eventsMassaged = filterEvents(2);
      break;
    case "3":
      eventsMassaged = filterEvents(3);
      break;
    case "all":
      eventsMassaged = events;
  }

  // Filter by searchfield
  const matchedEvents = eventsMassaged.filter((event) => {
    const eventTitleJson = JSON.stringify(event.title);
    return eventTitleJson.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <Grid minH="100vh" w="98vw" templateColumns="repeat(8, 1fr)">
      <GridItem colSpan={2}>
        <Flex
          direction="column"
          padding={4}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="80px"
        >
          <RadioGroup onChange={setValue} value={value} colorScheme="blue">
            <Flex direction="row" gap={4} wrap="wrap" justifyContent="center">
              <Radio value="all">All</Radio>
              <Radio value="1">Samba</Radio>
              <Radio value="2">Hip Hop</Radio>
              <Radio value="3">Jazz</Radio>
              <Radio value="4">Latin dance</Radio>
            </Flex>
          </RadioGroup>

          <Flex width="100%" justifyContent="center" alignItems="center">
            <InputGroup>
              <InputLeftElement>🔎</InputLeftElement>
              <Input
                type="text"
                variant="filled"
                placeholder="search by name"
                focusBorderColor="white"
                backgroundColor="gray.100"
                width="100%"
                onChange={handleChange}
              />
            </InputGroup>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem colStart={3} colEnd={9}>
        <Flex
          gap={8}
          padding={4}
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {matchedEvents.map((event) => {
            return (
              <Link to={`/event/${event.id}`} key={event.id}>
                <EventCard event={event} key={event.id} />
              </Link>
            );
          })}
        </Flex>
      </GridItem>
      {matchedEvents.length < 1 && (
        <GridItem colStart={5}>
          <Flex
            direction="column"
            gap={4}
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            bg="white"
            padding={6}
            width="300px"
          >
            <Heading paddingBottom={4}>Oops! </Heading>
            <Text>Events is not found</Text>
            <Button
              onClick={() => {
                handleRefresh();
              }}
            >
              Try again
            </Button>            
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};
