import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HeroLayout from "@/layouts/HeroLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { faArrowUpRightFromSquare, faChartGantt, faTableColumns, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type featureType = {
  name: string;
  id: number;
  icon: ReactNode;
  content: string;
};

const gmailFormSchema = z.object({
  gmail: z.string().regex(/^[^@]*@gmail\.com$/, {
    message:  'The value must be a Gmail address.',
  }),
});

const featureList: featureType[] = [
  {
    name: 'Table List',
    id: 0,
    icon: <FontAwesomeIcon icon={faTableList} className='text-xl' />,
    content: '一覽無遺的專案細節，輕鬆實現精準管理。'
  },
  {
    name: 'Gantt Chart',
    id: 1,
    icon: <FontAwesomeIcon icon={faChartGantt} className='text-xl' />,
    content: '直觀展現專案進程，不再煩惱時間掌控。'
  },
  {
    name: 'Kanban',
    id: 2,
    icon: <FontAwesomeIcon icon={faTableColumns} className='text-xl' />,
    content: '靈活管理任務狀態，輕鬆拖曳變更狀態。'
  },
];

const HeroPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const gmailForm = useForm<z.infer<typeof gmailFormSchema>>({
    resolver: zodResolver(gmailFormSchema),
    defaultValues: {
      gmail: '',
    }
  });

  const gmailFormSubmitHandler = (formData: z.infer<typeof gmailFormSchema>) => {
    const prefilledURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZKDH-kVsip2UVoxmkRbiE5aiSGp4aBP_zQGytXz6poGV9ww/viewform?usp=pp_url&entry.957720653='
    window.open(`${prefilledURL}${formData.gmail}`, '_blank');
    setIsOpen(false);
  };

  return (
    <HeroLayout>
      <main className="w-full flex flex-col gap-16 lg:gap-0 lg:grid lg:grid-flow-col lg:grid-rows-4 2xl:grid-rows-6 2xl:gap-32">
        <section className="w-full mt-8 lg:row-span-2 2xl:row-span-3 lg:my-auto 2xl:mt-auto 2xl:mb-0">
          <h3 className='text-6xl text-center lg:text-left leading-snug font-mono login__header text-white hero__title'>
            Manage Your Projects
          </h3>
          <h3 className='text-6xl text-center lg:text-left leading-snug font-mono login__header text-white hero__title' style={{animationDelay: '2s'}}>
            for FREE!
          </h3>
        </section>
        <section className='w-full lg:row-span-2 flex flex-col gap-8 lg:gap-16 2xl:gap-18 2xl:row-span-3'>
          <section className='w-full flex flex-col lg:flex-row gap-8 lg:row-span-1 2xl:row-span-1'>
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <Button className='w-auto border-gray-400 rounded-xl text-text' onClick={() => setIsOpen(true)}>Join Waitlist</Button>
              </DialogTrigger>
              <DialogContent onEscapeKeyDown={() => setIsOpen(false)} onPointerDownOutside={() => setIsOpen(false)}>
                <DialogHeader>
                  <DialogTitle>Join Waitlist</DialogTitle>
                  <DialogDescription>Type in the Gmail address to join waitlist.</DialogDescription>
                </DialogHeader>
                <Form {...gmailForm}>
                  <form onSubmit={gmailForm.handleSubmit(gmailFormSubmitHandler)} className="flex flex-col gap-8">
                    <FormField
                      control={gmailForm.control}
                      name='gmail'
                      render={({ field }) => (
                        <FormItem className='col-span-4 grid grid-cols-4 items-center'>
                          <FormLabel className='text-left'>Gmail</FormLabel>
                          <FormControl>
                            <Input className='col-span-3 rounded-xl' {...field} />
                          </FormControl>
                          <FormMessage className='col-span-4' style={{ color: 'red' }} />
                        </FormItem>
                      )} 
                    />
                    <Button type="submit" className='w-1/5 ml-auto mr-0 text-white bg-theme rounded-xl hover:bg-white hover:text-theme hover:border-theme'>Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Link to='/login' className='text-text'>
              <Button className='w-full border-theme rounded-xl flex gap-4 hover:bg-theme hover:border-theme hover:text-white'>
                Demo
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Button>
            </Link>
          </section>
          <section className='w-full flex flex-col pb-8 lg:pb-0 lg:flex-row gap-8 items-center lg:row-span-1 2xl:row-span-2'>
            {
              featureList.map((feature) => (
                <Card key={feature.id} className="z-50 rounded-xl w-full lg:w-64 border-text movingCard bg-background text-text">
                  <CardHeader>
                    <CardTitle className="flex gap-2 items-center">
                      {feature.icon}
                      <h4 className='text-xl cursor-default'>{feature.name}</h4>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='text-left cursor-default pb-8'>
                    {feature.content}
                  </CardContent>
                </Card>
              ))
            }
          </section>
        </section>
        <div className="absolute lg:block hidden right-0 top-1/2 z-0 transform -translate-y-1/2 pr-12">
          <div className="div-container">
            <div className="rounded-xl bg-random w-44 2xl:w-96 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-32 2xl:w-72 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-72 2xl:w-80 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-16 2xl:w-48 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-28 2xl:w-64 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-44 2xl:w-96 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-32 2xl:w-72 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-56 2xl:w-80 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-16 2xl:w-48 my-3 2xl:my-6 mr-0 ml-auto" />
            <div className="rounded-xl bg-random w-28 2xl:w-64 my-3 2xl:my-6 mr-0 ml-auto" />
          </div>
      </div>
      </main>
    </HeroLayout>
  )
}

export default HeroPage