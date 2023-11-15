import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex, Heading, Image } from "@chakra-ui/react";

export const UserCard = ({ userId }) => {
  const { users } = useContext(EventsContext);
  const user = users.filter((user) => {
    return user.id === Number(userId);
  });

  return (
    <Flex direction="row" align="center" gap={4}>
      <Image
        src={user[0].image}
        alt={user[0].name}
        borderRadius={200}
        boxSize="100px"
      />
      <div>
        <p>Event created by </p>
        <Heading fontSize="3xl">{user[0].name}</Heading>
      </div>
    </Flex>
  );
};
