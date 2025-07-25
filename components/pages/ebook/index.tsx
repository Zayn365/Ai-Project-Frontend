"use client";
import { useEffect, useRef, useState } from "react";
import { formAiEbookSchema } from "@/components/pages/sections/AiEbookForm";
import { z } from "zod";
import { success, fail } from "@/utils/ToastMessages";
import { Axios } from "@/utils/Axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { Download, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { marked } from "marked";
import CreateEbookModal from "./create-ebook-modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/common/loader";
import CreateAiEbookModal from "./create-ai-ebook-modal";
import { ebookFormSchema } from "../sections/EbookForm";
import { creditCharge } from "@/utils/CreditCharges";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";

type ebookSchema = {
  theme:
    | ["Drama", "Thriller", "Tragic", "Adventure", "Comedy", "Horror", "Gore"];
  title: String;
  content: String;
  audience: ["Adults", "Teens", "Children"];
  level: "Beginner" | "Intermediate" | "Professional";
};

export default function EbookPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useAppContext();
  const [submittedData, setSubmittedData] = useState<ebookSchema | null>(null);
  const [content, setContent] = useState<any>("");
  const [allEbooks, setAllEbooks] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openAI, setOpenAI] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredEbook, setFilteredEbook] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const getAllEbooks = async () => {
    try {
      const { data } = await Axios.get("/ebook");
      if (data.status === 200) {
        setAllEbooks(data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  async function handleSubmit(values: z.infer<typeof formAiEbookSchema>) {
    const { data: userData } = await Axios.get(`/user/${user?.id}`);
    if (userData?.message?.blocked) {
      toast.error("You are not able to create!");
      return;
    }
    if (userData?.message?.credits < creditCharge?.ebook) {
      toast.error("Please recharge your credits!");
      return;
    }
    if ((values.audience.length && values.theme) === 0) {
      fail("Please Define All Values");
      return;
    }
    try {
      const res = await Axios.post("/ebook/ai", {
        prompt: {
          title: values.title,
          audience: `${values.audience.concat()}`,
          theme: `${values.theme.concat()}`,
          level: values.level.toLowerCase(),
        },
        userId: user?.id,
      });
      // const image = await Axios.post("/images/ai", {
      //   userId: user?.id,
      //   prompt: {
      //     title: values.title,
      //     size: values.size,
      //     noOfImagesL: Number(values.noOfImagesL) ?? 1,
      //   },
      // });
      // setImages(image?.data?.message?.imagesurl?.urls);
      const { data: userCreditData } = await Axios.put(
        `/user/credits/${user?.id}`,
        {
          credits: creditCharge?.ebook,
        }
      );
      Cookies.set("user", JSON.stringify(userCreditData?.message));
      setUser(userCreditData?.message);
      setSubmittedData(values as any);
      setContent(res?.data?.message);
      success("Successfully Created");
      setOpenAI(false);
      getAllEbooks();
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  async function handleSimpleEbookSubmit(
    values: z.infer<typeof ebookFormSchema>
  ) {
    const { data: userData } = await Axios.get(`/user/${user?.id}`);
    if (userData?.message?.blocked) {
      toast.error("You are not able to create!");
      return;
    }
    try {
      const res = await Axios.post("/ebook", {
        title: values.title,
        content: values.content,
        userId: user?.id,
      });
      setSubmittedData(values as any);
      setContent(res?.data?.message);
      success("Successfully Created");
      setOpen(false);
      getAllEbooks();
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  const handleDownloadPDF = async (ebookContent: string, title: string) => {
    const tempDiv = document.createElement("div");

    // Style the temporary div
    tempDiv.style.width = "210mm";
    tempDiv.style.minHeight = "297mm";
    tempDiv.style.padding = "40px";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.backgroundColor = "#ffffff";
    tempDiv.style.color = "#000000";
    tempDiv.style.fontFamily = "Arial, sans-serif";

    // Append prose-style CSS
    const style = document.createElement("style");
    style.innerHTML = `
        .prose {
          color: #000;
          font-size: 14px;
          line-height: 1.6;
        }
        .prose h1 {
          font-size: 24px;
          font-weight: bold;
          margin-top: 32px;
          margin-bottom: 16px;
        }
        .prose h2 {
          font-size: 20px;
          font-weight: bold;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .prose p {
          margin-bottom: 12px;
          text-align: justify;
        }
      `;
    tempDiv.appendChild(style);

    const parsedHTML = await marked.parse(ebookContent.replace(/\\n/g, "\n"));

    const ebookHTML = document.createElement("div");
    ebookHTML.className = "prose";
    ebookHTML.innerHTML = parsedHTML;

    tempDiv.appendChild(ebookHTML);
    document.body.appendChild(tempDiv);

    // PDF Options
    const opt = {
      margin: 0,
      filename: `${title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        windowWidth: document.body.scrollWidth,
        windowHeight: document.body.scrollHeight,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    try {
      await html2pdf().set(opt).from(tempDiv).save();
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      document.body.removeChild(tempDiv); // cleanup
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { data } = await Axios.delete(`/ebook/${id}`, {
        data: { userId: user?.id },
      });
      if (data.status === 200) {
        toast.success(`Deleted successfully`);
        getAllEbooks();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEbooks();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = allEbooks.filter((item: any) => {
      const name = item.content ? String(item.content).toLowerCase() : ""; // Ensure `name` is a string
      return name.includes(lowerSearch);
    });

    setFilteredEbook(filtered);
  }, [search, allEbooks]);

  return (
    <section className="container pt-16 pb-4">
      {user?.id && (
        <div className="flex justify-end mb-2 gap-4">
          <Button onClick={() => setOpen(!open)}>Create a Ebook</Button>
          <Button onClick={() => setOpenAI(!openAI)}>Create a Ai Ebook</Button>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-4">
            <Input
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {submittedData && content && (
            <Card className="mt-8 relative">
              <CardHeader className="text-primary text-2xl">
                <div className="flex justify-between items-center gap-4">
                  <p>Submitted EBook</p>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold">{submittedData.title}</h3>
                <p>Theme: {submittedData.theme}</p>
                <p>Audience: {submittedData.audience}</p>
                <p>Difficulty: {submittedData.level}</p>
                <p>Ebook:</p>
                <div ref={contentRef} className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-4xl font-bold mt-6 mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-semibold mt-5 mb-3"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-justify leading-relaxed mb-4"
                          {...props}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <img
                          className="max-w-full max-h-[500px] rounded-md"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {content?.content?.replace(/\\n/g, "\n") ??
                      "Sorry! Something went wrong"}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All EBooks</h2>
            {filteredEbook.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredEbook.map((ebook, index) => (
                  <AccordionItem
                    key={ebook.id}
                    value={`ebook-${index}`}
                    className="mb-4 border rounded-md"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="flex justify-between items-center w-full p-4 transition-colors">
                        <h3 className="text-xl font-bold">
                          {ebook.content.match(/^# (.*?)$/m)?.[1] ||
                            `EBook ${ebook.id}`}
                        </h3>
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="p-4">
                      <Card>
                        <CardHeader className="text-primary text-2xl">
                          <div className="flex justify-between items-center gap-4">
                            <p ref={contentRef}>
                              {" "}
                              {ebook.content.match(/^# (.*?)$/m)?.[1] ||
                                `eBook ${ebook.id}`}
                            </p>
                            <div className="flex items-center gap-2">
                              <Download
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDownloadPDF(
                                    ebook.content,
                                    ebook.content.match(/^# (.*?)$/m)?.[1] ||
                                      `eBook_${ebook.id}`
                                  )
                                }
                              />
                              {Number(ebook?.user_id) === Number(user?.id) && (
                                <Trash2
                                  color="#FF0000"
                                  className="cursor-pointer"
                                  onClick={() => handleDelete(ebook.id)}
                                />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div
                            ref={contentRef}
                            className="prose prose-lg max-w-none"
                          >
                            <ReactMarkdown
                              components={{
                                h1: ({ node, ...props }) => (
                                  <h1
                                    className="text-4xl font-bold mt-6 mb-4"
                                    {...props}
                                  />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2
                                    className="text-2xl font-semibold mt-5 mb-3"
                                    {...props}
                                  />
                                ),
                                p: ({ node, ...props }) => (
                                  <p
                                    className="text-justify leading-relaxed mb-4"
                                    {...props}
                                  />
                                ),
                                img: ({ node, ...props }) => (
                                  <img
                                    className="max-w-full max-h-[500px] rounded-md"
                                    {...props}
                                  />
                                ),
                              }}
                            >
                              {ebook.content?.replace(/\\n/g, "\n") ??
                                "Sorry! Something went wrong"}
                            </ReactMarkdown>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p>No eBooks available.</p>
            )}
          </div>
        </>
      )}
      <CreateEbookModal
        open={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSimpleEbookSubmit}
      />
      <CreateAiEbookModal
        open={openAI}
        onClose={() => setOpenAI(false)}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
