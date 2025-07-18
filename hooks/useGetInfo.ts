import { Flags } from "@/types/flag.enum";
import { Question } from "@/types/question.type";
import { useEffect, useState } from "react";
import countries from "../assets/data/countries.json";
import players from "../assets/data/players.json";
export const useGetInfo = (question?: Question) => {
  const [info, setInfo] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setInfos(question);
  }, []);

  const setSuggestionsArray = (answer: string) => {
    const newArray = info.filter((i) => String(i).startsWith(answer)).slice(0, 5);;
    setSuggestions([...newArray]);
  };

  const setInfos = (question?: Question) => {
    switch (question?.flag) {
      case Flags.PLAYER: {
        setInfo([...getAllProperties(players, "name")]);
        break;
      }
      case Flags.COUNTRY: {
        setInfo([...getAllProperties(countries, "name")]);
        break;
      }
      case Flags.TEAM: {
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  };

  function getAllProperties<T>(obj: T, prop: string): any[] {
    const results: any[] = [];

    function recurse(o: any) {
      if (!o || typeof o !== "object") return;

      for (const key in o) {
        if (!Object.prototype.hasOwnProperty.call(o, key)) continue;

        if (key === prop) {
          results.push(o[key]);
        }

        if (typeof o[key] === "object" && o[key] !== null) {
          recurse(o[key]);
        }
      }
    }

    recurse(obj);
    return results;
  }

  return {
    setSuggestionsArray,
    suggestions,
    info,
  };
};
