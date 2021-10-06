import { useState } from 'react'

import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,


} from '@chakra-ui/react'



export default function BlockFriend({firstName, id, title, isOpen, onClose}) {
	

	return (
		<AlertDialog
	        isOpen={isOpen}
	        onClose={onClose}
	        isCentered
	        motionPreset="slideInBottom"
	      >
	        <AlertDialogOverlay>
	          <AlertDialogContent>
	            <AlertDialogHeader fontSize="lg" fontWeight="bold">
	              Block
	            </AlertDialogHeader>

	            <AlertDialogBody>
	              Do you want real <span className="text-red-600">Block</span> <span className="capitalize">{title}. {firstName}</span> ? 
	            </AlertDialogBody>

	            <AlertDialogFooter>
	              <Button onClick={onClose}>
	                Cancel
	              </Button>
	              <Button colorScheme="red" onClick={onClose} ml={3}>
	                Delete
	              </Button>
	            </AlertDialogFooter>
	          </AlertDialogContent>
	        </AlertDialogOverlay>
	    </AlertDialog>
	)
}