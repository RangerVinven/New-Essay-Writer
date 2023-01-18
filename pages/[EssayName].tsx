import React from 'react'
import { useRouter } from 'next/router';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import EssayEditOption from "../components/EssayEdit/EssayEditOption";
import EditHeadings from '../components/EssayEdit/EditHeadings';

export default function Essay() {
    
    const router = useRouter();
    const { EssayName } = router.query;

    return (
        <div className="h-screen">
            <div className="mt-2 flex justify-center items-center">
                <h1 className="text-2xl">{EssayName}</h1>
            </div>

            <div className="flex h-full justify-center mt-4">
                <div className="w-full h-full flex justify-center items-center">
                    {/* <EssayEditOption title="Headings" />
                    <EssayEditOption title="First Draft" />
                    <EssayEditOption title="Edit Sentences" /> */}

                    <Tabs variant='soft-rounded' colorScheme='green' align="center" className="w-1/3 h-full">
                    <TabList>
                        <Tab>Headings</Tab>
                        <Tab>First Draft</Tab>
                        <Tab>Edit Sentences</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EditHeadings essayId={1} />
                        </TabPanel>
                        
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
