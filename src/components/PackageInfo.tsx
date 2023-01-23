import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  Box,
  Text,
  Card,
  CardBody,
  Link,
  HStack,
  Spacer,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface PackageInfoProps {
  name: string;
}

interface Response {
  info: Info;
}

interface Info {
  home_page: string;
  package_url: string;
  summary: string;
}

export default function PackageInfo(props: PackageInfoProps) {
  const { data, isLoading, isError, error } = useQuery(
    props.name,
    getPackageData,
    { retry: false, refetchOnWindowFocus: false }
  );

  async function getPackageData() {
    const url = `https://pypi.org/pypi/${props.name}/json`;
    const data = await axios.get<Response>(url).then(res => res.data);

    return data;
  }

  return (
    <>
      <Box
        width={"full"}
        border={"1px solid #d3d3d3"}
        boxShadow={"1px 1px 2px 1px rgb(0 0 0 / 5%)"}
        padding={2}
        marginBottom={2}
      >
        <Link
          href={data?.info.package_url}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Text color={"#006dad"}>{props.name}</Text>
          {isLoading && <Spinner variant={""} />}
          {isError && (
            <Text color={"red.500"}>
              Error: Seems like package doesn't exist
            </Text>
          )}
          <Text>{data?.info.summary}</Text>
        </Link>
      </Box>
    </>
  );
}
