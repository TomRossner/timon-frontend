'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { NAME_REGEXP } from '@/lib/regexp';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from './ui/popover';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from './ui/command';
// import { Check, ChevronsUpDown } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useAppSelector } from '@/store/hooks';
// import { selectUsers } from '@/store/users/users.selectors';
// import { User } from '@/types/user';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const formSchema = z.object({
  name: z.string().regex(NAME_REGEXP, {
    message: 'Invalid team name',
  }),
  manager: z.string(),
  coaches: z.array(z.string()).optional(),
  roster: z.array(z.string()).optional(),
  logo: z.string().optional(),
  address: z.object({
    city: z.string().min(2, {message: 'City must contain at least 2 characters'}).max(32),
    fieldName: z.string().optional(),
    location: z.object({
      lat: z.number(),
      long: z.number(),
    }),
  }),
});

const defaultValues: z.infer<typeof formSchema> = {
  name: '',
  logo: '',
  manager: '',
  coaches: [],
  roster: [],
  address: {
    city: '',
    fieldName: '',
    location: {
      lat: 0,
      long: 0,
    },
  },
}

// const MultiSelect = ({
//   label,
//   options,
//   selected,
//   onChange,
// }: {
//   label: string;
//   name: string;
//   options: User[];
//   selected: string[];
//   onChange: (value: string[]) => void;
// }) => {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <FormItem>
//       <FormLabel>{label}</FormLabel>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn("w-full justify-between", !selected.length && "text-muted-foreground")}
//           >
//             {selected.length
//               ? `${selected.length} selected`
//               : `Select ${label.toLowerCase()}`}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0">
//           <Command>
//             <CommandGroup>
//               {options.map((option) => (
//                 <CommandItem
//                   key={option.uid}
//                   onSelect={() => {
//                     const newSelected = selected.includes(option.uid)
//                       ? selected.filter((s) => s !== option.uid)
//                       : [...selected, option.uid];
//                     onChange(newSelected);
//                   }}
//                 >
//                   <Avatar>
//                     <AvatarImage src={option.image} />
//                     <AvatarFallback>
//                       {option.firstName.charAt(0).toUpperCase()}
//                       {option.lastName.charAt(0).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   {option.firstName} {option.lastName}
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selected.includes(option.uid)
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </FormItem>
//   );
// };

const CreateTeamForm = () => {
  // const users = useAppSelector(selectUsers);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      // manager: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  // const selectedManager = useMemo(() => {
  //   if (value.length) {
  //     const user = users.get(value);

  //     console.log(user)
  //     return user?.firstName + " " + user?.lastName;
  //   }
  // }, [value, users]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Team Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Manager Select (Single) */}
        {/* <FormField
          control={form.control}
          name="manager"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Manager</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between"
                      >
                        {value.length ? selectedManager : "Select manager"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="Search user..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          {Array.from(users.values()).map((user) => (
                            <CommandItem
                              key={user.uid}
                              value={user.uid}
                              onSelect={() => {
                                field.onChange(user.uid);
                                setValue(user.uid);
                                setOpen(false);
                              }}
                            >
                              {user.firstName} {user.lastName}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value === user.uid ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}

        {/* Address - City */}
        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Search for city" {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address - Field Name */}
        <FormField
          control={form.control}
          name="address.fieldName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Address</FormLabel>
              <FormControl>
                <Input placeholder="Stadium / Venue name" {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you a player?</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select your answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem onSelect={() => {field.onChange(/*user._id*/)}} value={'yes'}>Yes</SelectItem>
                      <SelectItem onSelect={() => {field.onChange(null)}} value={'no'}>No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='cursor-pointer'>Create Team</Button>
      </form>
    </Form>
  );
};

export default CreateTeamForm;
