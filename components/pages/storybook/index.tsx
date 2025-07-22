import Loader from "@/components/common/loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";
import { Axios } from "@/utils/Axios";
import { success } from "@/utils/ToastMessages";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { fail } from "assert";
import html2pdf from "html2pdf.js";
import { Download, Trash2 } from "lucide-react";
import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import CreateAiStorybookModal from "./create-ai-storybook-modal";
import { creditCharge } from "@/utils/CreditCharges";
import Cookies from "js-cookie";

const storySchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
});

export default function StoryBookPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useAppContext();
  const [message, setMessage] = useState<any>(null);
  const [openAI, setOpenAI] = useState<boolean>(false);

  const [allStoryBooks, setAllStoryBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof storySchema
  > | null>(null);

  const getAllStoryBook = async () => {
    try {
      const { data } = await Axios.get("/storybook");
      if (data.status === 200) {
        setAllStoryBooks(data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  async function handleSubmit(values: z.infer<typeof storySchema>) {
    const { data: userData } = await Axios.get(`/user/${user?.id}`);
    if (userData?.message?.blocked) {
      toast.error("You are not able to create!");
      return;
    }
    if (userData?.message?.credits < creditCharge?.storybook) {
      toast.error("Please recharge your credits!");
      return;
    }
    try {
      const res = await Axios.post("/storybook/ai", {
        prompt: {
          title: values.prompt,
        },
        userId: user?.id,
      });
      const { data: userCreditData } = await Axios.put(
        `/user/credits/${user?.id}`,
        {
          credits: creditCharge?.storybook,
        }
      );
      Cookies.set("user", JSON.stringify(userCreditData?.message));
      setUser(userCreditData?.message);
      setMessage(res.data.message);
      setSubmittedData(values);
      success("Successfully Created");
      setOpenAI(false);
      getAllStoryBook();
    } catch (err) {
      console.log(err);
      fail("Submission failed");
    }
  }

  const handleDownloadPDF = async (storyBookContent: string, title: string) => {
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

    const parsedHTML = await marked.parse(
      storyBookContent.replace(/\\n/g, "\n")
    );

    const blogHTML = document.createElement("div");
    blogHTML.className = "prose";
    blogHTML.innerHTML = parsedHTML;

    tempDiv.appendChild(blogHTML);
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
      const { data } = await Axios.delete(`/storybook/${id}`, {
        data: { userId: user?.id },
      });
      if (data.status === 200) {
        toast.success(`Deleted successfully`);
        getAllStoryBook();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStoryBook();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = allStoryBooks.filter((item: any) => {
      const name = item.content ? String(item.content).toLowerCase() : "";
      return name.includes(lowerSearch);
    });

    setFilteredData(filtered);
  }, [search, allStoryBooks]);

  return (
    <section className="container pt-16 pb-4">
      {user?.id && (
        <div className="flex justify-end mb-2 gap-4">
          <Button onClick={() => setOpenAI(!openAI)}>
            Create a Ai StoryBook
          </Button>
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
          {message && (
            <Card className="mt-8 relative">
              <CardHeader className="text-primary text-2xl">
                <div className="flex justify-between items-center gap-4">
                  <p>Submitted Storybook</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>Storybook</p>
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
                    {message?.content?.replace(/\\n/g, "\n") ??
                      "Sorry! Something went wrong"}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All Storybooks</h2>
            {filteredData.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredData.map((storybook, index) => (
                  <AccordionItem
                    key={storybook.id}
                    value={`storybook-${index}`}
                    className="mb-4 border rounded-md"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="flex justify-between items-center w-full p-4 transition-colors">
                        <h3 className="text-xl font-bold">
                          {storybook.content.match(/^# (.*?)$/m)?.[1] ||
                            `Storybook ${storybook.id}`}
                        </h3>
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="p-4">
                      <Card>
                        <CardHeader className="text-primary text-2xl">
                          <div className="flex justify-between items-center gap-4">
                            <p ref={contentRef}>
                              {" "}
                              {storybook.content.match(/^# (.*?)$/m)?.[1] ||
                                `storybook ${storybook.id}`}
                            </p>
                            <div className="flex items-center gap-2">
                              <Download
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDownloadPDF(
                                    storybook.content,
                                    storybook.content.match(
                                      /^# (.*?)$/m
                                    )?.[1] || `storybook_${storybook.id}`
                                  )
                                }
                              />
                              {Number(storybook?.user_id) ===
                                Number(user?.id) && (
                                <Trash2
                                  color="#FF0000"
                                  className="cursor-pointer"
                                  onClick={() => handleDelete(storybook.id)}
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
                              {storybook.content?.replace(/\\n/g, "\n") ??
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
              <p>No storybooks available.</p>
            )}
          </div>
        </>
      )}
      <CreateAiStorybookModal
        open={openAI}
        onClose={() => setOpenAI(false)}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}
