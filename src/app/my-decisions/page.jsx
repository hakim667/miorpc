"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import getMyDecisions from "@/api/getMyDecisions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import DecisionDetails from "@/components/DecisionDetails";

const Page = () => {
  const [current, setCurrent] = useState(null);
  const [decisions, setDecisions] = useState([]);
  useEffect(() => {
    getMyDecisions().then((res) => {
      setDecisions(res);
    });
  }, []);
  const getArrayData = (decision) => {
    let temp = [];
    temp.push({
      title: "Structure",
      detail: decision.structure,
    });
    temp.push({
      title: "Utilisateur",
      detail: decision.type,
    });
    temp.push({
      title: "Code classification",
      detail: decision.classificationCode,
    });
    temp.push({
      title: "Articles",
      detail: decision.articles,
    });
    temp.push({
      title: "Attendues",
      detail: decision.expectedOutcome,
    });
    temp.push({
      title: "Contenu",
      detail: decision.content,
    });
    return temp;
  };
  const handleClickInfo = (index) => {
    setCurrent(index);
  };
  const handleClose = (index) => {
    setCurrent(null);
  };
  return (
    <div className=" bg-background h-screen flex flex-col">
      <Header />
      <div className=" h-[90%] flex flex-col items-center pt-4">
        <div className=" w-[95%] h-[70%] flex flex-col gap-4 ">
          <h1 className=" text-2xl font-bold">Mes décisions :</h1>
          <div className=" max-h-[90%] w-full flex flex-col">
            <div className=" w-full h-full flex flex-col border border-black">
              <div className=" flex flex-row p-1 bg-white font-bold text-base justify-around">
                <p className=" w-[23%] text-center">Code référence</p>
                <div className=" w-[1px] h-full bg-black"></div>
                <p className=" w-[23%] text-center">Objet</p>
                <div className=" w-[1px] h-full bg-black"></div>
                <p className=" w-[23%] text-center">Type</p>
                <div className=" w-[1px] h-full bg-black"></div>
                <p className=" w-[23%] text-center">Status</p>
                <div className=" w-[1px] h-full bg-black"></div>
                <p className=" w-[6%]"></p>
              </div>
              {decisions.map((decision, index) => {
                return (
                  <div
                    key={index}
                    className={` flex flex-row p-1 font-bold text-base ${
                      index % 2 === 0
                        ? " bg-background bg-opacity-50"
                        : "bg-white"
                    } justify-around`}
                  >
                    <p className=" w-[23%] p-1 break-words">
                      {decision.referenceCode}
                    </p>
                    <div className=" w-[1px] h-full bg-black"></div>
                    <p className=" w-[23%] p-1 break-words">
                      {decision.subject}
                    </p>
                    <div className=" w-[1px] h-full bg-black"></div>
                    <p className=" w-[23%] p-1 break-words">{decision.type}</p>
                    <div className=" w-[1px] h-full bg-black"></div>
                    <div className=" w-[23%] p-1 flex justify-center items-center">
                      <p
                        className={` px-3 py-1 w-fit break-words ${
                          decision.etat === "In validation"
                            ? " bg-primary"
                            : decision.etat === "Validated"
                            ? " bg-[#8bc34a]"
                            : " bg-[#c02942]"
                        } rounded-3xl text-center p-2`}
                      >
                        {decision.etat}
                      </p>
                    </div>
                    <div className=" w-[1px] h-full bg-black"></div>
                    <div className=" w-[6%] flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        size="2x"
                        className=" cursor-pointer p-1"
                        onClick={() => handleClickInfo(index)}
                      />
                      <DecisionDetails
                        display={index === current}
                        data={getArrayData(decision)}
                        handleClose={handleClose}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
