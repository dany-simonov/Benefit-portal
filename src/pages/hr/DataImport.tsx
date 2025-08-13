import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImportJob {
  id: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  recordsTotal: number;
  recordsProcessed: number;
  startTime: string;
}

const mockJobs: ImportJob[] = [
  {
    id: '1',
    fileName: 'employees_2024_q1.xlsx',
    status: 'completed',
    progress: 100,
    recordsTotal: 1234,
    recordsProcessed: 1234,
    startTime: '2024-01-15 14:30'
  },
  {
    id: '2',
    fileName: 'benefits_update.csv',
    status: 'processing',
    progress: 45,
    recordsTotal: 856,
    recordsProcessed: 385,
    startTime: '2024-01-15 15:15'
  }
];

const DataImport = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Имитация загрузки файла на сервер
    setTimeout(() => {
      handleFileUpload(selectedFile);
      setSelectedFile(null);
      setIsUploading(false);
      
      toast({
        title: "Файл успешно загружен",
        description: `Файл ${selectedFile.name} отправлен на сервер и добавлен в очередь обработки`,
      });
    }, 1500);
  };

  const handleFileUpload = (file: File) => {
    const newJob: ImportJob = {
      id: Date.now().toString(),
      fileName: file.name,
      status: 'pending',
      progress: 0,
      recordsTotal: 0,
      recordsProcessed: 0,
      startTime: new Date().toLocaleString('ru-RU')
    };

    setJobs(prev => [newJob, ...prev]);
    
    // Имитация обработки файла на сервере
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'processing', recordsTotal: Math.floor(Math.random() * 1000) + 100 }
          : job
      ));
    }, 2000);

    // Имитация завершения обработки
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { 
              ...job, 
              status: 'completed', 
              progress: 100,
              recordsProcessed: job.recordsTotal
            }
          : job
      ));
    }, 8000);
  };

  const handleDownloadTemplate = (templateType: string) => {
    const templates = {
      employees: 'employees_template.xlsx',
      benefits: 'benefits_template.xlsx',
      allocations: 'allocations_template.xlsx'
    };
    
    toast({
      title: "Скачивание шаблона",
      description: `Файл ${templates[templateType as keyof typeof templates]} загружается...`,
    });
    
    // Имитация скачивания файла
    setTimeout(() => {
      toast({
        title: "Шаблон загружен",
        description: `Файл ${templates[templateType as keyof typeof templates]} успешно скачан.`,
      });
    }, 1500);
  };

  const handleDownloadReport = (job: ImportJob) => {
    toast({
      title: "Скачивание отчёта",
      description: `Отчёт по файлу ${job.fileName} загружается...`,
    });
    
    // Имитация скачивания отчёта
    setTimeout(() => {
      toast({
        title: "Отчёт загружен",
        description: `Файл report_${job.fileName} успешно скачан.`,
      });
    }, 1500);
  };

  const handleRetry = (job: ImportJob) => {
    toast({
      title: "Повторная обработка",
      description: `Файл ${job.fileName} добавлен в очередь для повторной обработки.`,
    });
    
    // Имитация повторной обработки
    setJobs(prev => prev.map(j => 
      j.id === job.id 
        ? { ...j, status: 'pending', progress: 0 }
        : j
    ));
  };

  const handleDelete = (jobId: string) => {
    toast({
      title: "Удаление задачи",
      description: "Задача удалена из очереди обработки.",
    });
    
    setJobs(prev => prev.filter(j => j.id !== jobId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'processing': return 'Обрабатывается';
      case 'completed': return 'Завершено';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Импорт данных</h1>
        <p className="text-gray-600">Загрузите CSV или Excel файлы для массового обновления данных</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Загрузка файлов</CardTitle>
          <CardDescription>
            Поддерживаемые форматы: CSV, Excel (.xlsx, .xls)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-medium mb-2">
              Перетащите файлы сюда или нажмите для выбора
            </h3>
            <p className="text-gray-600 mb-4">
              Максимальный размер файла: 10MB
            </p>
            
            {/* Скрытый input для выбора файла */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button 
              variant="outline" 
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? 'Загрузка...' : 'Выбрать файлы'}
            </Button>
          </div>

          {/* Отображение выбранного файла */}
          {selectedFile && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📄</div>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      Размер: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? 'Загружается...' : 'Загрузить'}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:shadow-md transition-shadow"
              onClick={() => handleDownloadTemplate('employees')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👥</div>
                <div>Шаблон сотрудников</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:shadow-md transition-shadow"
              onClick={() => handleDownloadTemplate('benefits')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <div>Шаблон льгот</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 hover:shadow-md transition-shadow"
              onClick={() => handleDownloadTemplate('allocations')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <div>Шаблон начислений</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Очередь импорта</CardTitle>
          <CardDescription>
            Статус загруженных файлов и процесс их обработки
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{job.fileName}</h3>
                    <p className="text-sm text-gray-600">Начат: {job.startTime}</p>
                  </div>
                  <Badge className={getStatusColor(job.status)}>
                    {getStatusText(job.status)}
                  </Badge>
                </div>

                {job.status === 'processing' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Прогресс</span>
                      <span>{job.recordsProcessed} из {job.recordsTotal}</span>
                    </div>
                    <Progress value={job.progress} />
                  </div>
                )}

                {job.status === 'completed' && (
                  <div className="text-sm text-green-600">
                    ✅ Обработано {job.recordsProcessed} записей
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-3">
                  {job.status === 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(job)}
                    >
                      Скачать отчёт
                    </Button>
                  )}
                  {job.status === 'failed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRetry(job)}
                    >
                      Повторить
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет загруженных файлов
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataImport;
