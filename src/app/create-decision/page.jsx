"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import createDecision from "@/api/createDecision";

const Page = () => {
  const types = ["Type décision", "A", "B", "D", "E"];
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(types[0]);
  const [classificationCode, setClassificationCode] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  const [articles, setArticles] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    if (
      type === "Type décision" ||
      classificationCode === "" ||
      referenceCode === "" ||
      expectedOutcome === "" ||
      articles === "" ||
      subject === "" ||
      content === ""
    ) {
      alert("Remplissez tout les champs");
      return;
    }
    setLoading(true);
    await createDecision(
      type,
      classificationCode,
      referenceCode,
      expectedOutcome,
      articles,
      subject,
      content
    ).then((res) => {
      setLoading(false);
      alert(res.message);
    });
  };

  return (
    <div className=" bg-background h-screen flex flex-col">
      <Header />
      <div className=" h-[90%] flex flex-col items-center pt-4">
        <div className=" w-[95%] flex flex-col gap-4 items-center">
          <h1 className=" text-2xl font-bold">Créer décision</h1>
          <Input
            placeholder="Code classification"
            value={classificationCode}
            setValue={setClassificationCode}
          />
          <Input
            placeholder="Code référence"
            value={referenceCode}
            setValue={setReferenceCode}
          />
          <Input
            placeholder="Attendues"
            value={expectedOutcome}
            setValue={setExpectedOutcome}
          />
          <Input
            placeholder="Articles"
            value={articles}
            setValue={setArticles}
          />
          <Input placeholder="Objet" value={subject} setValue={setSubject} />
          <Input placeholder="Contenu" value={content} setValue={setContent} />
          <select
            className=" w-full h-10 rounded-2xl text-xl pl-2"
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <div className=" w-[30%]">
            <Button text="Créer" loading={loading} onClick={handleCreate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
