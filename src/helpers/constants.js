export const ASSIGNMENT_TYPES = [
	"multiple choice",
	"essay",
	"matching",
	"open ended",
	"mixed"
].map((type,index) => ({key: index, value: type, text: type}) )



export const SUBJECTS = [
		"english literature",
		"math",
		"chemistry",
		"biology",
		"writing",
		"grammar",
		"physics",
		"foreign language",
		"history"
	].map((subject,index) => ({key: index, value: subject, text: subject}) )

export const GRADES = [
			"1st",
			"2nd",
			"3rd",
			"4th",
			"5th",
			"6th",
			"7th",
			"8th",
			"9th",
			"10th",
			"11th",
			"12th",
			"college"
		].map((subject,index) => ({key: index, value: subject, text: subject}) )



export const PLACEHOLDERS = { 
			teacher: ["What grades do you teach? What's your favorite book? Do you like pizza?", 
					  "What subjects do you specialize in?"],
			student : ["What grade are you in? What's your favorite subject? How many jumping jacks can you do?", 
				       "What subjects are you looking to learn?"]
			}