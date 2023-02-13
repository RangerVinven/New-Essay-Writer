import React from 'react'
import { useRouter } from 'next/router';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import EssayEditOption from "../components/EssayEdit/EssayEditOption";
import EditHeadings from '../components/EssayEdit/EditHeadings';
import LoadingSpinner from '../components/General/LoadingSpinner';
import FirstDraft from '../components/FirstDraft/FirstDraft';

export default function Essay() {
    
    const router = useRouter();
    const { EssayName, id } = router.query;

    return (
        <div className="h-screen w-screen ">
            <div className="mt-2 flex justify-center items-center">
                <h1 className="text-2xl">{EssayName}</h1>
            </div>

            <div className="flex w-full h-full justify-center mt-4">
                <div className="w-full h-full flex justify-center items-center">

                    <Tabs isLazy={true} variant='soft-rounded' colorScheme='green' align="center" className="h-full w-full">
                    <TabList>
                        <Tab>Headings</Tab>
                        <Tab>First Draft</Tab>
                        <Tab>Edit Sentences</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                router.isReady ? <EditHeadings essayId={Number(id)} /> : <LoadingSpinner />
                            }
                        </TabPanel>
                        
                        <TabPanel>
                            {
                                router.isReady ? <FirstDraft essayId={Number(id)} /> : <LoadingSpinner />
                            }
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
