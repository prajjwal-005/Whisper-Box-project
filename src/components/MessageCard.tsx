'use client';

import React, { useRef, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X, Share2, Eye, EyeOff, AlertTriangle, Palette, Check, ShieldAlert } from 'lucide-react';
import { Message } from '@/model/User.model';
import { Card, CardHeader } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { Badge } from '@/components/ui/badge';
import { ShareModal } from './ShareModal';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(!message.isBlurred);
  const [showThemePicker, setShowThemePicker] = useState(false);


  useEffect(() => {
    if (!showThemePicker) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowThemePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showThemePicker]);

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id as string}`
      );
      toast.success(response.data.message);
      onMessageDelete(message._id as string);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to delete message');
    }
  };

  // --- RENDER: HIDDEN MESSAGE ---
  if (message.isHidden) {
    return (
      <Card className="card-bordered bg-muted/20 border-red-500/20 opacity-80">
        <CardHeader>
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-3 text-destructive">
               <ShieldAlert className="h-5 w-5" />
               <div className="flex flex-col">
                 <span className="font-semibold text-sm">Highly Sensitive Content</span>
                 <span className="text-xs text-muted-foreground italic">Filtered for safety</span>
               </div>
             </div>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Delete hidden message"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete hidden message?</AlertDialogTitle>
                  <AlertDialogDescription>Permanently remove this filtered message?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
             </AlertDialog>
           </div>
        </CardHeader>
      </Card>
    );
  }

  // --- RENDER: NORMAL/WARNED/BLURRED MESSAGES ---
  return (
    <>
      <Card className={`
        group relative overflow-visible transition-all duration-300
        hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10
        ${message.isWarned 
          ? 'border-yellow-500/50 bg-yellow-50/5 dark:bg-yellow-950/10' 
          : 'border-border hover:border-primary/20'
        }
      `}>

        <CardHeader className="pb-4 space-y-4 pt-10">
          
          {/* Warning Badge for Spam */}
          {message.isWarned && (
            <div className="flex items-center text-xs font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 p-2 px-3 rounded-lg w-fit border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0"/>
              <span>Flagged as potential spam</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-3">
              <div className="relative">
                
                <div 
                  className={`
                    group/message rounded-xl p-4 transition-all duration-300
                    ${message.isBlurred && !isRevealed
                      ? 'blur-md select-none cursor-pointer bg-muted/20 hover:bg-muted/30' 
                      : 'bg-muted/20 hover:bg-muted/30'
                    }
                  `}
                  onClick={() => {
                    if (message.isBlurred) {
                      setIsRevealed((prev) => !prev);
                    }
                  }}
                 
                  role={message.isBlurred ? "button" : undefined}
                  tabIndex={message.isBlurred ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (message.isBlurred && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setIsRevealed((prev) => !prev);
                    }
                  }}
                  aria-label={message.isBlurred ? (isRevealed ? "Click to blur content" : "Click to reveal content") : undefined}
                >
                  <p className="text-base font-medium leading-relaxed text-foreground" 
                     style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                    {message.content}
                  </p>
                </div>
                
                
                {message.isBlurred && !isRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <Badge className="shadow-xl backdrop-blur-md px-5 py-2.5 bg-background/95 border-2 border-primary/50">
                      <Eye className="h-4 w-4 mr-2 text-primary animate-pulse"/> 
                      <span className="font-semibold text-sm text-primary">Click to reveal</span>
                    </Badge>
                  </div>
                )}

              
                {message.isBlurred && isRevealed && (
                  <div className="absolute top-2 right-2 z-20">
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-muted/80 transition-colors bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRevealed(false);
                      }}
                    >
                      <EyeOff className="h-3 w-3 mr-1"/> 
                      <span>Blur again</span>
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <span>{dayjs(message.createdAt).format('MMM D, YYYY')} • {dayjs(message.createdAt).format('h:mm A')}</span>
              </div>
            </div>

                      {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              
              <ShareModal content={message.content} />
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    aria-label="Delete message"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The message will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteConfirm} 
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
      </Card>

    </>
  );
}